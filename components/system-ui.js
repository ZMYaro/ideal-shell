import { html } from 'lit';

import { ShadowlessLitElement } from '/scripts/shadowless_lit_element.js';
import './system-bar.js';
import './window-manager.js';

export class IdealSystemUI extends ShadowlessLitElement {
	
	static get properties() {
		return {
			gesture: { type: Boolean, reflect: true }
		};
	}
	
	render() {
		return html`
			<ideal-window-manager></ideal-window-manager>
			<ideal-system-bar ?gesture="${this.gesture}"></ideal-system-bar>
		`;
	}
}

window.customElements.define('ideal-system-ui', IdealSystemUI);
