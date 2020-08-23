import {html} from 'https://unpkg.com/lit-element@2.4.0/lit-element.js?module';
import 'https://unpkg.com/@material/mwc-list@canary/mwc-list.js?module';
import 'https://unpkg.com/@material/mwc-list@canary/mwc-list-item/mwc-list-item.js?module';

import {ShadowlessLitElement} from '/scripts/shadowless-lit-element.js';

export class IdealAllAppsMenu extends ShadowlessLitElement {

	APP_ICON_DIR = 'images/app_icons/';

	APPS = [
		{
			name: 'Instagram,
			url: 'https://www.instagram.com',
			icon: 'instagram.png'
		}, {
			name: 'PaintZ',
			url: 'https://paintz.app',
			icon: 'paintz.png'
		}, {
			name: 'Slack',
			url: 'https://app.slack.com/client',
			icon: 'slack.png'
		}, {
			name: 'Twitter',
			url: 'https://twitter.com',
			icon: 'twitter.png'
		}, {
			name: 'YouTube',
			url: 'https://www.youtube.com',
			icon: 'youtube.png'
		}
	];

	handleAppSelected(ev) {
		console.log(ev);
		// TODO: Launch app.
	}

	render() {
		let appListItems = this.APPS.map(app => html`
			<mwc-list-item graphic="icon">
				<img slot="graphic" src="${this.APP_ICON_DIR}${app.icon}" alt="" />
				${app.name}
			</mwc-list-item>
		`)};
		return html`
			<h1>All apps</h1>
			<mwc-list>
				${appListItems}
			</mwc-list>
		`;
	}
}

window.customElements.define('ideal-all-apps-menu', IdealAllAppsMenu);
