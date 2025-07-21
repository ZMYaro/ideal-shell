import { html } from 'lit';

import { ShadowlessLitElement } from '/scripts/shadowless_lit_element.js';
import './launcher-apps.js';

export class IdealLauncherPane extends ShadowlessLitElement {
	
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
	
	attributeChangedCallback(name, oldVal, newVal) {
		if (name === 'open' && newVal !== undefined &&  newVal !== null) {
			// Start scrolled to the first page of apps.
			this.querySelector('ideal-launcher-apps').scrollLeft = window.innerWidth;
		}
	}
	
	render() {
		return html`
			<ideal-launcher-apps></ideal-launcher-apps>
		`;
	}
}

window.customElements.define('ideal-launcher-pane', IdealLauncherPane);
