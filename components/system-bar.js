import {html} from 'https://unpkg.com/lit-element@2.4.0/lit-element.js?module';
import 'https://unpkg.com/@material/mwc-icon-button@canary/mwc-icon-button.js?module';
import {mdiApps, mdiChevronDown, mdiCircleSlice8, mdiMicrosoftWindows} from 'https://unpkg.com/@mdi/js/mdi.js?module';

import {ShadowlessLitElement} from '/scripts/shadowless-lit-element.js';
import '/components/system-icon-area.js';
import '/components/launcher-pane.js';
import '/components/action-pane.js';

export class IdealSystemBar extends ShadowlessLitElement {
	
	static get properties() {
		return {
			gesture: { type: Boolean, reflect: true },
			platform: { type: String, reflect: true }
		};
	}
	
	openLauncherPane() {
		this.querySelector('ideal-launcher-pane').open = true;
	}
	
	openSystemPane() {
		this.querySelector('ideal-action-pane').open = true;
	}
	
	render() {
		let launcherIcon =
			this.gesture ? mdiChevronDown :
			this.platform === 'windows' ? mdiMicrosoftWindows :
			this.platform === 'android' ? mdiCircleSlice8 :
			mdiApps;
		
		return html`
			<mwc-icon-button label="Launcher" id="system-launcher-button" @click="${this.openLauncherPane}">
				  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="${launcherIcon}" /></svg>
			</mwc-icon-button>
			<ideal-system-icon-area ?gesture="${this.gesture}" @click="${this.openSystemPane}"></ideal-system-icon-area>
			<ideal-launcher-pane></ideal-launcher-pane>
			<ideal-action-pane></ideal-action-pane>
		`;
	}
}

window.customElements.define('ideal-system-bar', IdealSystemBar);
