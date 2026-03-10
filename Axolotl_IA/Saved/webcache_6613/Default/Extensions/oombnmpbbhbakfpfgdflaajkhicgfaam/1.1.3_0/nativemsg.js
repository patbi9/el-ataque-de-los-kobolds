"use strict";

const NATIVE_APP = "com.eset.browserprivacyandsecurity";
const MissingProductErrorsList = [
	"Specified native messaging host not found.",
	`No such native application ${NATIVE_APP}`
];
let g_connector = null;
let exifMsgCounter = 0;
let exifMsgResetTimer;
let connectError = false;
let lastError;
const msgStorage = new Map();

function NativeMsgListener(msg) {
	
	if (!(msg instanceof Object)) {
		lastError = `Invalid message format: ${JSON.stringify(msg)}`;
	} else if (msg.log) {
		
	} else if (msg.connect === "error") {
		ShowAlertPopup(ProtectionStatus.ConnectionLost);
		if (!connectError) {
			g_connector.disconnect();
			g_connector = null;
			connectError = true;
			InitLocalSettings();
		}
	} else {
		ProcessMessage(msg).then((replyDetail) => {
			FinishRequest(msg?.msgId || 0, replyDetail);
		});
	}

	if (lastError) {
		FinishRequest(0, lastError);
		lastError = "";
	}
}

async function ProcessMessage(msg) {
	let reply = null;

	if (msg.cmd) {
		const msgStorageItem = PopMsgStorageItem(msg.msgId);
		if (msg.cmd === "init") {
			connectError = false;
			reply = await UpdateSettings(msg.settings, msg?.profile);

			ShowAlertPopup(reply.protectionStatus);
			checkAutoRemoveOption(reply);
		} else if (msg.cmd === "secure-search" && msg.tabId) {
			chrome.tabs.sendMessage(msg.tabId, { payload: msg }, () => {
				
			});
		} else if (msg.cmd === "uninstall") {
			chrome.management.uninstallSelf();
		} else if (msg.cmd === "get-site-settings") {
			if (msg.user_data && isChrome) {
				chrome.runtime.sendMessage({ type: "site-setting", user_data: msg.user_data });
			}
		} else if (msg.cmd === "website-scan" && msgStorageItem.tabId) {
			if (msg.status === WebsiteScanStatus.Block) {
				const { tabId, url: storedTabUrl } = msgStorageItem;
				const storedTabUrlHost = new URL(storedTabUrl).host;

				try {
					const { url: currentTabUrl } = await chrome.tabs.get(tabId);
					const { cfg: config, [StorageKey.WebsiteScanBlockList]: blockList = {} } = await chrome.storage.local.get([
						"cfg",
						StorageKey.WebsiteScanBlockList
					]);

					chrome.storage.local.set({ [StorageKey.WebsiteScanBlockList]: { ...blockList, [msg.msgId]: storedTabUrl } });

					if (
						(storedTabUrlHost && new URL(currentTabUrl).host === storedTabUrlHost) ||
						currentTabUrl === storedTabUrl
					) {
						config.msgCount.blockedPages += 1;
						chrome.storage.local.set({ cfg: config });

						chrome.tabs.sendMessage(msgStorageItem.tabId, { cmd: msg.cmd, block: true, msgId: msg.msgId });
					}
				} catch (error) {
					
				}
			}
		}
	} else if (msg.settings) {
		reply = await UpdateSettings(msg.settings, msg?.profile);
	} else if (msg.notification?.metadata_cleanup) {
		chrome.storage.local.get(["cfg"], (data) => {
			if (data.cfg.notifications) {
				exifMsgCounter++;
				PushNotification(exifMsgCounter);
			}
		});
	}

	return reply;
}

function FinishRequest(msgId, detail) {
	if (detail) {
		SendNativeMessage("log", { data: { msgId: msgId, detail: JSON.stringify(detail) } });
	}
}

function UpdateSettings(settings, profile = null) {
	return new Promise((resolve) => {
		chrome.storage.local.get(["cfg"], async (data) => {
			RunUpdate(data.cfg, m_config);

			data.cfg.initialized = true;
			data.cfg.exifClean = settings.exif;
			data.cfg.productType = ProductMap.get(settings.product).name;
			data.cfg.privacyFeatures = ProductMap.get(settings.product).privacy;

			if (
				data.cfg.isWebsiteScanSupported === false &&
				settings.isWebsiteScanSupported === true &&
				!data.cfg.updatePageInfo?.find((info) => info.version === "1.1.0") &&
				!isFirstRunAfterInstall
			) {
				data.cfg.updatePageInfo.push({
					version: "1.1.0",
					wasUpdatePageShown: false,
					requiredFields: ["isWebsiteScanSupported"],
					shouldUpdatePageBeShown: false
				});
			}

			data.cfg.isWebsiteScanSupported = settings.isWebsiteScanSupported;

			if (settings.protectionStatus) {
				data.cfg.protectionStatus = settings.protectionStatus;
			} else if (settings.licence === false) {
				data.cfg.protectionStatus = ProtectionStatus.LicenseExpired;
			} else if (settings.status === "restart-required") {
				data.cfg.protectionStatus = ProtectionStatus.RestartRequired;
			} else {
				data.cfg.protectionStatus = ProtectionStatus.Protected;
			}

			if (profile) {
				data.cfg.profile = profile;
			}

			const permissionOrigin = await chrome.permissions.contains({
				origins: [AllUrls]
			});

			data.cfg.permissions = permissionOrigin;

			let shouldUpdatePageBeShown = false;

			data.cfg.updatePageInfo.forEach((updateInfo, idx) => {
				if (
					!updateInfo.wasUpdatePageShown &&
					updateInfo.requiredFields.every((requiredField) => !!data.cfg[requiredField])
				) {
					shouldUpdatePageBeShown = true;
					data.cfg.updatePageInfo[idx].shouldUpdatePageBeShown = true;
				}
			});

			await chrome.storage.local.set({ cfg: data.cfg });

			if (shouldUpdatePageBeShown) {
				await chrome.tabs.create({
					url: "/action/pages/whatsNew/index.html"
				});

				SendNativeMessage("trace", {
					data: { action: "whats_new_110_page_open", granted_permissions: data.cfg.permissions }
				});
			}

			isFirstRunAfterInstall = false;

			resolve(data.cfg);
		});
	});
}

function ResetCounter() {
	exifMsgCounter = 0;
	chrome.storage.local.get(["cfg"], (data) => {
		data.cfg.msgCount.exifCount = exifMsgCounter;
		chrome.storage.local.set({ cfg: data.cfg });
	});
}

function PushNotification(count) {
	clearTimeout(exifMsgResetTimer);

	const UpdateCounter = () => {
		return new Promise((resolve) => {
			chrome.storage.local.get(["cfg"], (data) => {
				data.cfg.msgCount.exifCount = count;
				chrome.storage.local.set({ cfg: data.cfg }, () => {
					resolve();
				});
			});
		});
	};

	UpdateCounter().then(() => {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, files: ["notifications.js"] });
		});

		exifMsgResetTimer = setTimeout(ResetCounter, 10000);
	});
}

function SendNativeMessageEx(cmd, dataToSend = {}, dataToStore = {}) {
	const nativemsg = {
		cmd: cmd,
		msgId: GenerateMessageId()
	};

	msgStorage.set(nativemsg.msgId, dataToStore);

	if (Object.keys(dataToSend).length) {
		nativemsg.data = dataToSend;
	}

	
	GetConnector()?.postMessage(nativemsg);
}

function SendNativeMessage(cmd, { profile = null, tabId = InvalidTabId, data = null }) {
	let nativemsg = {
		cmd: cmd,
		msgId: GenerateMessageId()
	};

	if (profile !== null && profile.length) {
		nativemsg.profile = profile;
	}

	if (tabId !== InvalidTabId) {
		nativemsg.tabId = tabId;
	}

	if (data !== null) {
		nativemsg.data = data;
	}

	
	GetConnector()?.postMessage(nativemsg);
}

function GenerateMessageId() {
	let msgId = 0;
	do {
		msgId = Math.floor(Math.random() * Math.pow(2, 30));
	} while (msgStorage.has(msgId));
	return msgId;
}

function PopMsgStorageItem(msgId) {
	if (msgId) {
		const msgStorageItem = msgStorage.get(msgId) || {};
		msgStorage.delete(msgId);
		return msgStorageItem;
	}
	return {};
}

function NativeDisconnect(onDisconnectArg) {
	
	if (chrome.runtime.lastError) {
		lastError = chrome.runtime.lastError.message;
	} else if (onDisconnectArg && onDisconnectArg.error.message) {
		lastError = onDisconnectArg.error.message;
	}

	g_connector = null;

	if (MissingProductErrorsList.includes(lastError)) {
		ShowAlertPopup(ProtectionStatus.MissingProduct);
	} else {
		ShowAlertPopup(ProtectionStatus.ConnectionLost);
	}
}

function ShowAlertPopup(alertCode) {
	let isAlert = true;

	switch (alertCode) {
		case ProtectionStatus.LicenseExpired:
			chrome.action.setPopup({ popup: "./action/alert_expired_license.html" });
			break;
		case ProtectionStatus.ConnectionLost:
			chrome.action.setPopup({ popup: "./action/alert_connection_lost.html" });
			break;
		case ProtectionStatus.UnsupportedBrowser:
			chrome.action.setPopup({ popup: "./action/alert_unsupported_browser.html" });
			break;
		case ProtectionStatus.MissingProduct:
			chrome.action.setPopup({ popup: "./action/alert_missing_product.html" });
			break;
		default:
			isAlert = false;
			break;
	}

	if (!isAlert) {
		isProductActive = true;
		return;
	}

	isProductActive = false;

	chrome.storage.local.get(["cfg"], (data) => {
		data.cfg.protectionStatus = alertCode;
		chrome.storage.local.set({ cfg: data.cfg });
	});
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

function GetConnector() {
	if (!g_connector) {
		try {
			g_connector = chrome.runtime.connectNative(NATIVE_APP);
			g_connector.onMessage.addListener(NativeMsgListener);
			g_connector.onDisconnect.addListener(NativeDisconnect);
		} catch (e) {
			ShowAlertPopup(ProtectionStatus.ConnectionLost);
			
			lastError = e.message;
			g_connector = null;
		}
	}

	return g_connector;
}

function RestartConnector() {
	if (g_connector) {
		g_connector.disconnect();
		g_connector = null;
	}
}
