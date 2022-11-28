import {html} from 'https://unpkg.com/lit-element@2.4.0/lit-element.js?module';

import {ShadowlessLitElement} from '/scripts/shadowless-lit-element.js';
import '/components/ideal-quick-settings.js';

export class IdealActionPane extends ShadowlessLitElement {
	
	static get properties() {
		return {
			open: { type: Boolean, reflect: true }
		};
	}
	
	constructor() {
		super();
		
		// Close on click outside.
		this.addEventListener('pointerdown', (ev) => {
			ev.stopPropagation();
		});
		document.documentElement.addEventListener('pointerdown', () => {
			this.open = false;
		});
	}
	
	render() {
		return html`
			<ideal-quick-settings></ideal-quick-settings>
		`;
	}
}

window.customElements.define('ideal-action-pane', IdealActionPane);
