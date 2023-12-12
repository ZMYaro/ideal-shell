import {html} from 'https://unpkg.com/lit-element@2.4.0/lit-element.js?module';
import 'https://unpkg.com/@material/mwc-button@canary/mwc-button.js?module';
//import 'https://unpkg.com/@material/mwc-icon@canary/mwc-icon.js?module';

import {ShadowlessLitElement} from '/scripts/shadowless-lit-element.js';
import '/components/battery-icon.js';
import '/components/clock.js';

export class IdealSystemIconArea extends ShadowlessLitElement {
	
	static get properties() {
		return {
			networkInformationAvailable: { type: Boolean, attribute: false },
			networkConnected: { type: Boolean, attribute: false }
		};
	}
	
	constructor() {
		super();
		
		let boundUpdateNetwork = this.updateNetwork.bind(this);
		
		// Set up network indicator.
		if (navigator.connection && navigator.connection.type) {
			this.networkInformationAvailable = true;
			this.updateNetwork();
			navigator.connection.addEventListener('change', boundUpdateNetwork);
		}
	}
	
	updateNetwork() {
		this.networkType = navigator.connection.type;
	}
	
	render() {
		// TODO: Network status
		let networkIcon = !this.networkInformationAvailable ? 'signal_wifi_4_bar' : // If unavailable, just show generic wi-fi icon.
				this.networkType === 'ethernet' ? 'settings_ethernet' :
				this.networkType === 'wifi' ? 'signal_wifi_4_bar' :
				this.networkType === 'bluetooth' ? 'bluetooth_connected' :
				this.networkType === 'cellular' || this.networkType === 'wimax' ? 'signal_cellular_4_bar' :
				'signal_wifi_off';
		
		return html`
			<mwc-button>
				<!--<mwc-icon>chat</mwc-icon>
				<mwc-icon>event</mwc-icon>
				<mwc-icon>email</mwc-icon>
				&nbsp;&middot;&nbsp;-->
				<mwc-icon>${networkIcon}</mwc-icon>
				<ideal-battery-icon></ideal-battery-icon>
				<ideal-clock></ideal-clock>
			</mwc-button>
		`;
	}
}

window.customElements.define('ideal-system-icon-area', IdealSystemIconArea);
