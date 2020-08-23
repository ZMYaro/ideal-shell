import {html} from 'https://unpkg.com/lit-element@2.4.0/lit-element.js?module';
import 'https://unpkg.com/@material/mwc-icon-button@canary/mwc-icon-button.js?module';
import {mdiApps, mdiChevronUp, mdiCircleSlice8, mdiMicrosoftWindows} from 'https://unpkg.com/@mdi/js/mdi.js?module';

import {ShadowlessLitElement} from '/scripts/shadowless-lit-element.js';
import '/components/ideal-system-icon-area.js';
import '/components/ideal-launcher-pane.js';
import '/components/ideal-system-pane.js';

export class IdealSystemBar extends ShadowlessLitElement {

	static get properties() {
		return {
			gesture: { type: Boolean, reflect: true },
			mobile: { type: Boolean, reflect: true },
			platform: { type: String, reflect: true }
		};
	}

	render() {
		let launcherIcon =
			this.gesture ? mdiChevronUp :
			this.platform === 'windows' ? mdiMicrosoftWindows :
			this.platform === 'android' ? mdiCircleSlice8 :
			mdiApps;
		
		return html`
			${this.gesture ? '' : html`<mwc-icon-button icon="arrow_back" id="system-back-button"></mwc-icon-button>`}
			<mwc-icon-button label="Launcher" id="system-launcher-button">
				  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="${launcherIcon}" /></svg>
			</mwc-icon-button>
			<ideal-system-icon-area ?gesture="${this.gesture}"></ideal-system-icon-area>
			<ideal-launcher-pane></ideal-launcher-pane>
			<ideal-system-pane></ideal-system-pane>
		`;
	}
}

window.customElements.define('ideal-system-bar', IdealSystemBar);
