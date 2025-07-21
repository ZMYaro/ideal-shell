import { html } from 'lit';

import { ShadowlessLitElement } from '/scripts/shadowless_lit_element.js';
import { APPS, APP_ICON_DIR } from '/scripts/app_list.js';
import './app-tile.js';

export class IdealLauncherPins extends ShadowlessLitElement {

	pinnedApps = [
		'gmail',
		'slack',
		'gkeep',
		'gmaps',
		'paintz',
		'fb',
		'mastodon',
		'twitter',
		'instagram',
		'youtube'
	].map(id => ({ id, ...APPS[id] }));
	
	_handleAppSelected(ev) {
		console.log(ev);
		// TODO: Launch app.
	}
	
	render() {
		let appTiles = this.pinnedApps.map(app => html`
			<ideal-app-tile
					icon="${APP_ICON_DIR}${app.id}_fg.png"
					bg="${APP_ICON_DIR}${app.id}_bg.png"
					size="${Math.random() < 0.5 ? 'small' : 'medium'}"
					text-color="${app.tileTextColor}"
					@click="${this.handleAppSelected}">
				${app.shortName || app.name}
			</ideal-app-tile>
		`);
		
		return html`
			${appTiles}
		`;
	}
}

window.customElements.define('ideal-launcher-pins', IdealLauncherPins);
