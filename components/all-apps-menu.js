import {html, css} from 'https://unpkg.com/lit-element@2.4.0/lit-element.js?module';
import 'https://unpkg.com/@material/mwc-list@canary/mwc-list.js?module';
import 'https://unpkg.com/@material/mwc-list@canary/mwc-list-item.js?module';

import {ShadowlessLitElement} from '/scripts/shadowless-lit-element.js';
import {APPS, APP_ICON_DIR} from '/scripts/app_list.js';

export class IdealAllAppsMenu extends ShadowlessLitElement {
	
	handleAppSelected(ev) {
		console.log(ev);
		// TODO: Launch app.
	}
	
	render() {
		let appListItems = Object.keys(APPS).map(id => html`
			<mwc-list-item graphic="icon">
				<img slot="graphic" src="${APP_ICON_DIR}${id}.png" alt="" />
				${APPS[id].name}
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
