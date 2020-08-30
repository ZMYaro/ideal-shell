import {html, css} from 'https://unpkg.com/lit-element@2.4.0/lit-element.js?module';

import {ShadowlessLitElement} from '/scripts/shadowless-lit-element.js';
import {APPS, APP_ICON_DIR} from '/scripts/app-list.js';
import '/components/ideal-app-tile.js';

export class IdealLauncherPinScreen extends ShadowlessLitElement {
	
	pinnedApps = APPS;
	
	_handleAppSelected(ev) {
		console.log(ev);
		// TODO: Launch app.
	}
	
	render() {
		let appTiles = this.pinnedApps.map(app => html`
			<ideal-app-tile
					icon="${APP_ICON_DIR}${app.id}_fg.png"
					bg="${APP_ICON_DIR}${app.id}_bg.png"
					size="medium"
					text-color="${app.tileTextColor}"
					@click="${this.handleAppSelected}">
				${app.shortName || app.name}
			</ideal-app-tile>
		`);
		
		return html`
			<h1>Pinned apps</h1>
			${appTiles}
		`;
	}
}

window.customElements.define('ideal-launcher-pin-screen', IdealLauncherPinScreen);
