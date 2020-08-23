import {html} from 'https://unpkg.com/lit-element@2.4.0/lit-element.js?module';

import {ShadowlessLitElement} from '/scripts/shadowless-lit-element.js';
import '/components/ideal-system-bar.js';

export class IdealSystemUI extends ShadowlessLitElement {

	static get properties() {
		return {
			gesture: { type: Boolean, reflect: true },
			mobile: { type: Boolean, reflect: true }
		};
	}

	render() {
		return html`
			<ideal-system-bar ?gesture="${this.gesture}" ?mobile="${this.mobile}"></ideal-system-bar>
		`;
	}
}

window.customElements.define('ideal-system-ui', IdealSystemUI);
