import {LitElement, css, html} from 'https://unpkg.com/lit-element@2.4.0/lit-element.js?module';
import 'https://unpkg.com/@material/mwc-icon@canary/mwc-icon.js?module';

export class IdealBatteryIcon extends LitElement {
	
	static get styles() {
		return css`
			:host {
				display: inline-flex;
				align-items: center;
			}
		`;
	}
	
	static get properties() {
		return {
			showpercentage: { type: Boolean, reflect: true },
			batteryManagerAvailable: { type: Boolean, attribute: false },
			batteryCharging: { type: Boolean, attribute: false },
			batteryLevel: { type: Number, attribute: false }
		};
	}

	constructor() {
		super();
		this.setUpBatteryManager();
	}
	
	async setUpBatteryManager() {
		if (!navigator.getBattery) { return; }
		
		let battery = await navigator.getBattery();
		if (!battery) { return; }
		
		let boundUpdateBattery = this.updateBattery.bind(this);
		
		this.batteryManagerAvailable = true;
		this.updateBattery({ target: battery });
		battery.addEventListener('chargingchange', boundUpdateBattery);
		battery.addEventListener('levelchange', boundUpdateBattery);
	}

	updateBattery(ev) {
		this.batteryCharging = ev.target.charging;
		this.batteryLevel = ev.target.level;
	}

	render() {
		let batteryPercentage = 'Can\'t read battery',
			batteryIcon = 'battery_unknown';
		
		if (this.batteryManagerAvailable) {
			batteryPercentage = Math.round(this.batteryLevel * 100) + '%';
			
			if (this.batteryCharging) {
				batteryIcon = 'battery_charging_full';
			} else {
				// Convert the battery level to one of the icons in eighths.
				let batteryEighths = Math.round(this.batteryLevel / 0.125),
					iconSuffix = batteryEighths < 7 ? `${batteryEighths}_bar` : 'full';
				batteryIcon = `battery_${iconSuffix}`;
			}
		}
		
		return html`
			<mwc-icon title="${this.showpercentage ? '' : batteryPercentage}">${batteryIcon}</mwc-icon>
			${this.showpercentage ? batteryPercentage : ''}
		`;
	}
}

window.customElements.define('ideal-battery-icon', IdealBatteryIcon);
