import {LitElement, html, css} from 'https://unpkg.com/lit-element@2.4.0/lit-element.js?module';

import {cardCSS} from '/scripts/shared_css_snippets.js';
import '/components/ideal-qs-tile.js';

export class IdealQuickSettings extends LitElement {
	
	static get styles() {
		return css`
			:host {
				${cardCSS}
				
				display: flex;
				flex-direction: column;
			}
			.tiles {
				display: grid;
				grid-template-columns: repeat(4, 1fr);
				gap: 4px;
			}
		`;
	}
	
	render() {
		return html`
			<!-- TODO: <ideal-qs-slider></ideal-qs-slider> -->
			<div>[brightness slider will go here]</div>
			<div class="tiles">
				<ideal-qs-tile icon="signal_wifi_4_bar" submenu checked>Wi-fi</ideal-qs-tile>
				<ideal-qs-tile icon="bluetooth" submenu checked>Bluetooth</ideal-qs-tile>
				<ideal-qs-tile icon="signal_cellular_off">Mobile data</ideal-qs-tile>
				<ideal-qs-tile icon="battery_saver">Battery saver</ideal-qs-tile>
				<ideal-qs-tile icon="cast" submenu>Cast</ideal-qs-tile>
				<ideal-qs-tile icon="screen_rotation_alt">Auto-rotate</ideal-qs-tile>
				<ideal-qs-tile icon="location_disabled">Location</ideal-qs-tile>
				<ideal-qs-tile icon="accessibility">Accessibility</ideal-qs-tile>
				<ideal-qs-tile icon="">Nearby share</ideal-qs-tile>
				<ideal-qs-tile icon="wifi_tethering_off">Hotspot</ideal-qs-tile>
			</div>
		`;
	}
}

window.customElements.define('ideal-quick-settings', IdealQuickSettings);
