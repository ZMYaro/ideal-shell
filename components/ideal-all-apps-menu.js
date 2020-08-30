import {html, css} from 'https://unpkg.com/lit-element@2.4.0/lit-element.js?module';
import 'https://unpkg.com/@material/mwc-list@canary/mwc-list.js?module';
import 'https://unpkg.com/@material/mwc-list@canary/mwc-list-item.js?module';

import {ShadowlessLitElement} from '/scripts/shadowless-lit-element.js';
import {APPS, APP_ICON_DIR} from '/scripts/app-list.js';

export class IdealAllAppsMenu extends ShadowlessLitElement {
	
	handleAppSelected(ev) {
		console.log(ev);
		// TODO: Launch app.
	}
	
	render() {
		let appListItems = APPS.map(app => html`
			<mwc-list-item graphic="icon">
				<img slot="graphic" src="${APP_ICON_DIR}${app.id}.png" alt="" />
				${app.name}
			</mwc-list-item>
		`);
		
		return html`
			<h1>All apps</h1>
			<mwc-list>
				${appListItems}
			</mwc-list>
		`;
	}
}

window.customElements.define('ideal-all-apps-menu', IdealAllAppsMenu);
