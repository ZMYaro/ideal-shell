import {html} from 'https://unpkg.com/lit-element@2.4.0/lit-element.js?module';
import 'https://unpkg.com/@material/mwc-button@canary/mwc-button.js?module';
//import 'https://unpkg.com/@material/mwc-icon@canary/mwc-icon.js?module';

import {ShadowlessLitElement} from '/scripts/shadowless-lit-element.js';

export class IdealSystemIconArea extends ShadowlessLitElement {

	//time = '00:00';

	static get properties() {
		return {
			networkInformationAvailable: { type: Boolean, attribute: false },
			networkConnected: { type: Boolean, attribute: false },
			batteryManagerAvailable: { type: Boolean, attribute: false },
			batteryCharging: { type: Boolean, attribute: false },
			batteryLevel: { type: Number, attribute: false },
			time: { type: String, attribute: false }
		};
	}

	constructor() {
		super();
		
		let boundUpdateNetwork = this.updateNetwork.bind(this),
			boundUpdateBattery = this.updateBattery.bind(this),
			boundUpdateClock = this.updateClock.bind(this);
		
		// Set up network indicator.
		if (navigator.connection && navigator.connection.type) {
			this.networkInformationAvailable = true;
			this.updateNetwork();
			navigator.connection.addEventListener('change', boundUpdateNetwork);
		}

		// Set up battery indicator.
		if (navigator.getBattery) {
			navigator.getBattery().then((battery) => {
				this.batteryManagerAvailable = true;
				this.updateBattery({ target: battery });
				battery.addEventListener('chargingchange', boundUpdateBattery);
				battery.addEventListener('levelchange', boundUpdateBattery);
			});
		}

		// Set up clock.
		this.updateClock();
		setTimeout(() => {
			this.updateClock();
			setInterval(boundUpdateClock, 60000);
		}, (60 - (new Date()).getSeconds()) * 1000);
	}
	
	updateNetwork() {
		this.networkType = navigator.connection.type;
	}

	updateBattery(ev) {
		this.batteryCharging = ev.target.charging;
		this.batteryLevel = ev.target.level;
	}

	updateClock() {
		let now = new Date(),
			hour = now.getHours(),
			minutes = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
		this.time = `${hour}:${minutes}`;
	}

	render() {
		// TODO: Network status
		let networkIcon = !this.networkInformationAvailable ? 'signal_wifi_4_bar' : // If unavailable, just show generic wi-fi icon.
				this.networkType === 'ethernet' ? 'settings_ethernet' :
				this.networkType === 'wifi' ? 'signal_wifi_4_bar' :
				this.networkType === 'bluetooth' ? 'bluetooth_connected' :
				this.networkType === 'cellular' || this.networkType === 'wimax' ? 'signal_cellular_4_bar' :
				'signal_wifi_off';

		let batteryIcon = !this.batteryManagerAvailable ? 'battery_unknown' :
				this.batteryCharging ? 'battery_charging_full' :
				'battery_std',
			batteryPercentage = Math.round(this.batteryLevel * 100) + '%';
		
		return html`
			<mwc-button>
				<!--<mwc-icon>chat</mwc-icon>
				<mwc-icon>event</mwc-icon>
				<mwc-icon>email</mwc-icon>
				&nbsp;&middot;&nbsp;-->
				<mwc-icon>${networkIcon}</mwc-icon>
				<mwc-icon title="${batteryPercentage || ''}">${batteryIcon}</mwc-icon>
				${this.time}
			</mwc-button>
		`;
	}
}

window.customElements.define('ideal-system-icon-area', IdealSystemIconArea);
