const permissionsToRequest = {
	origins: [AllUrls]
};
const injectionStatus = {
	skip: 0,
	secureSearchGoogle: 1,
	secureSearchBing: 2,
	websiteScan: 3
};
const loadingStatus = {
	loading: "loading",
	complete: "complete"
};
const searchEngine = {
	bing: "bing",
	google: "google"
};
const supportedGoogleSearchParams = {
	tbm: ["vid"],
	udm: ["6", "7", "9", "10", "11", "14", "18", "31", "34"]
};

const tabsState = new Map();

function isUrlMatchSearchEnginePattern(url, engine) {
	const regex = new RegExp(`^https:\\/\\/www\\.${engine}(?:\\.{1}[a-zA-X]+){1,2}\\/search\\?.*`);

	return regex.test(url);
}

async function isSecureSearchScriptInjected(tabId) {
	try {
		await chrome.tabs.sendMessage(tabId, "isInjected", { frameId: 0 });
		return true;
	} catch {
		return false;
	}
}

function isGoogleSeachTabSupported(url) {
	const urlSearchParams = new URLSearchParams(new URL(url).search);
	const tbmParam = urlSearchParams.get("tbm");
	const udmParam = urlSearchParams.get("udm");

	if (
		(!tbmParam && !udmParam) ||
		supportedGoogleSearchParams.tbm.includes(tbmParam) ||
		supportedGoogleSearchParams.udm.includes(udmParam)
	) {
		return true;
	}

	return false;
}

async function getInjectionStatus(tabId, url, config) {
	if (!["http://", "https://", "file:///"].some((protocol) => url.startsWith(protocol))) {
		return injectionStatus.skip;
	}

	if (isUrlMatchSearchEnginePattern(url, searchEngine.google)) {
		if ((await isSecureSearchScriptInjected(tabId)) || !isGoogleSeachTabSupported(url)) {
			return injectionStatus.skip;
		}

		return injectionStatus.secureSearchGoogle;
	}

	if (isUrlMatchSearchEnginePattern(url, searchEngine.bing)) {
		if (await isSecureSearchScriptInjected(tabId)) {
			return injectionStatus.skip;
		}

		return injectionStatus.secureSearchBing;
	}

	if (
		!config.isWebsiteScanEnabled ||
		!config.isWebsiteScanSupported ||
		!config.dataCollectionPermissions.browsingActivity ||
		!config.dataCollectionPermissions.websiteContent
	) {
		return injectionStatus.skip;
	}

	const { [StorageKey.WebsiteScanIgnoreList]: websiteScanIgnoreList = [] } = await chrome.storage.session.get([
		StorageKey.WebsiteScanIgnoreList
	]);
	const urlHost = new URL(url).host;

	if ((urlHost && websiteScanExcludedList.includes(urlHost)) || websiteScanIgnoreList.includes(urlHost || url)) {
		return injectionStatus.skip;
	}

	return injectionStatus.websiteScan;
}

async function injectWebsiteScanScript(tabId, tabUrl, isTabLoaded = false) {
	const currentTabState = tabsState.get(tabId);
	const frames = await chrome.webNavigation.getAllFrames({ tabId });

	frames?.forEach(async ({ frameId }) => {
		if (currentTabState.loadedFrames.includes(frameId)) {
			return;
		}

		try {
			const [{ result: executionResult }] = await chrome.scripting.executeScript({
				target: { tabId, frameIds: [frameId] },
				func: runWebsiteScan,
				args: [{ tabUrl, frameId, shouldScanIframesWithSpecialSrc: isChrome }],
				injectImmediately: true
			});

			if (executionResult?.isDocumentLoaded && !isTabLoaded) {
				currentTabState.loadedFrames.push(frameId);
			}
		} catch (error) {
			
		}
	});

	if (isTabLoaded) {
		currentTabState.loadedFrames = [];
	}

	currentTabState.websiteScanTimeoutId = -1;
}

async function injectContentScript(tabId, tabUrl, tabLoadingStatus) {
	if (!tabLoadingStatus) {
		return;
	}

	if (!isProductActive) {
		return;
	}

	const { cfg: config } = await chrome.storage.local.get("cfg");

	if (!config.permissions) {
		return;
	}

	const scriptToInjectStatus = await getInjectionStatus(tabId, tabUrl, config);

	const secureSearchFiles = [
		"./secure-search/styles/iconStyles.js",
		"./secure-search/styles/popupStyles.js",
		"./secure-search/common.js"
	];

	try {
		switch (scriptToInjectStatus) {
			case injectionStatus.secureSearchGoogle:
				if (tabLoadingStatus === loadingStatus.complete) {
					chrome.scripting.executeScript({
						target: { tabId: tabId },
						files: [...secureSearchFiles, "./secure-search/g-search.js"]
					});
				}
				break;

			case injectionStatus.secureSearchBing:
				if (tabLoadingStatus === loadingStatus.complete) {
					chrome.scripting.executeScript({
						target: { tabId: tabId },
						files: [...secureSearchFiles, "./secure-search/b-search.js"]
					});
				}
				break;

			case injectionStatus.websiteScan: {
				if (!tabsState.has(tabId)) {
					tabsState.set(tabId, { loadedFrames: [] });
				}

				const currentTabState = tabsState.get(tabId);

				if (tabLoadingStatus === loadingStatus.loading) {
					const tabUrlWithoutAnchor = tabUrl?.match(/(^[^#]*)/)[0];

					if (currentTabState.url !== tabUrlWithoutAnchor || currentTabState.websiteScanTimeoutId === -1) {
						currentTabState.url = tabUrlWithoutAnchor;
						currentTabState.loadedFrames = [];
						clearTimeout(currentTabState.websiteScanTimeoutId);
						currentTabState.websiteScanTimeoutId = setTimeout(() => {
							injectWebsiteScanScript(tabId, tabUrl);
						}, 6000);

						try {
							await chrome.tabs.sendMessage(tabId, { cmd: "website-scan" }, { frameId: 0 });
						} catch {
							await chrome.scripting.executeScript({
								target: { tabId },
								func: addWebsiteScanListener,
								injectImmediately: true
							});
						}
					}
				} else {
					clearTimeout(currentTabState.websiteScanTimeoutId);
					currentTabState.websiteScanTimeoutId = setTimeout(() => {
						injectWebsiteScanScript(tabId, tabUrl, true);
					}, 2000);
				}
				break;
			}

			default:
				break;
		}
	} catch (error) {
		
	}
}

function removeTabStateItem(tabId) {
	if (!tabsState.has(tabId)) {
		return;
	}

	clearTimeout(tabsState.get(tabId).websiteScanTimeoutId);
	tabsState.delete(tabId);
}
