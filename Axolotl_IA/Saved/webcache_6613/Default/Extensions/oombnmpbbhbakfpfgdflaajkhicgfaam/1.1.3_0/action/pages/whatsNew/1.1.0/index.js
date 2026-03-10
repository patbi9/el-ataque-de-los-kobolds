class FeaturesUpdate_1_1_0 extends BaseComponent {
	/**
	 * @param {Object} props
	 */
	constructor(props) {
		super(props);

		this.init();
	}

	init() {
		this.allowAccessSection = new AllowAccessSection({
			title: chrome.i18n.getMessage("whats_new_page_1_1_0_allow_access_section_title"),
			description: chrome.i18n.getMessage("whats_new_page_1_1_0_allow_access_section_description"),
			onButtonClick: async () => {
				chrome.runtime.sendMessage({
					msg: "whats_new_110_ask_permissions"
				});

				const isPermissionGranted = await chrome.permissions.request({ origins: [AllUrls] });

				if (isPermissionGranted) {
					chrome.runtime.sendMessage({
						msg: "whats_new_110_grant_permissions"
					});
				}
			},
			isVisible: false
		});

		this.learnMoreLink = document.createElement("a");

		chrome.storage.local.get("cfg").then(({ cfg: config }) => {
			this.setAllowAccessSectionVisibility(config.permissions);
			this.learnMoreLink.href = GetHelpLink(config.productType);
		});

		chrome.storage.onChanged.addListener((changes, area) => {
			const newConfig = changes.cfg?.newValue;

			if (!newConfig || area !== "local") {
				return;
			}

			this.setAllowAccessSectionVisibility(newConfig.permissions);
		});

		this.render();
	}

	setAllowAccessSectionVisibility(isPermissionGranted) {
		this.allowAccessSection.props.isVisible = !isPermissionGranted;
	}

	render() {
		this.element = document.createElement("div");
		this.element.className = "features-update-1-1-0";

		const mainContent = document.createElement("div");
		mainContent.className = "features-update-1-1-0__main-content";

		const infoSection = document.createElement("div");
		infoSection.className = "features-update-1-1-0__info-section";

		const header = document.createElement("div");
		header.className = "features-update-1-1-0__header";

		const icon = new Icon({
			href: "../../assets/icons.svg#website-security-inspector",
			className: "features-update-1-1-0__icon"
		});

		const title = document.createElement("h1");
		title.className = "features-update-1-1-0__title";
		title.innerText = chrome.i18n.getMessage("whats_new_page_1_1_0_title");

		header.appendChild(icon.node);
		header.appendChild(title);
		infoSection.appendChild(header);

		const featureDescriptionFirst = document.createElement("div");
		featureDescriptionFirst.className = "features-update-1-1-0__description";
		featureDescriptionFirst.innerText = chrome.i18n.getMessage("whats_new_page_1_1_0_description_1");

		const featureDescriptionSecond = document.createElement("div");
		featureDescriptionSecond.className = "features-update-1-1-0__description";
		featureDescriptionSecond.innerText = chrome.i18n.getMessage("whats_new_page_1_1_0_description_2");

		this.learnMoreLink.className = "features-update-1-1-0__learn-more-link";
		this.learnMoreLink.target = "_blank";
		this.learnMoreLink.innerText = chrome.i18n.getMessage("learn_more_link");

		const externalLinkIcon = new Icon({
			href: "../../assets/icons.svg#external-link",
			className: "features-update-1-1-0__external-link-icon"
		});

		this.learnMoreLink.appendChild(externalLinkIcon.node);

		infoSection.appendChild(featureDescriptionFirst);
		infoSection.appendChild(featureDescriptionSecond);
		infoSection.appendChild(this.learnMoreLink);
		mainContent.appendChild(infoSection);

		const previewImage = document.createElement("img");
		previewImage.className = "features-update-1-1-0__preview-image";
		previewImage.src = "../../assets/website-security-inspector-preview.png";
		previewImage.alt = chrome.i18n.getMessage("whats_new_page_1_1_0_image_alt");

		mainContent.appendChild(previewImage);

		this.element.appendChild(this.allowAccessSection.node);
		this.element.appendChild(mainContent);

		this.node.appendChild(this.element);
	}
}
