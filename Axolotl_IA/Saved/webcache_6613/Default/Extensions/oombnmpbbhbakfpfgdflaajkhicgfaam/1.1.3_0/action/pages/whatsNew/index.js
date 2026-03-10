const updatePages = new Map([["1.1.0", { component: FeaturesUpdate_1_1_0 }]]);

document.body.appendChild(
	new Header({
		title: chrome.i18n.getMessage("whats_new_page_header"),
		subtitle: chrome.i18n.getMessage("whats_new_page_subheader")
	}).node
);

const mainContent = document.createElement("div");
mainContent.className = "whats-new__main-content container";

chrome.storage.local.get("cfg").then(({ cfg: config }) => {
	if (!config.dataCollectionPermissions?.browsingActivity || !config.dataCollectionPermissions?.websiteContent) {
		document.body.appendChild(new DataCollectionConsentDialog().node);
	}

	let isConfigChanged = false;

	config.updatePageInfo.forEach((updateInfo, idx) => {
		if (!updateInfo.shouldUpdatePageBeShown) {
			return;
		}

		const UpdateSectionComponent = updatePages.get(updateInfo.version)?.component;

		if (UpdateSectionComponent) {
			mainContent.appendChild(new UpdateSectionComponent().node);
		}

		config.updatePageInfo[idx].wasUpdatePageShown = true;
		isConfigChanged = true;
	});

	if (isConfigChanged) {
		chrome.storage.local.set({ cfg: config });
	}
});

document.body.appendChild(mainContent);

document.body.appendChild(new Footer().node);
