import {html} from 'https://unpkg.com/lit-element@2.4.0/lit-element.js?module';

import {ShadowlessLitElement} from '/scripts/shadowless-lit-element.js';

export class IdealSystemPane extends ShadowlessLitElement {
	
	static get properties() {
		return {
			open: { type: Boolean, reflect: true }
		};
	}
	
	render() {
		return html`
		`;
	}
}

window.customElements.define('ideal-system-pane', IdealSystemPane);
