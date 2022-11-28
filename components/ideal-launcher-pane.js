import {html} from 'https://unpkg.com/lit-element@2.4.0/lit-element.js?module';

import {ShadowlessLitElement} from '/scripts/shadowless-lit-element.js';
import '/components/ideal-launcher-pins.js';
import '/components/ideal-all-apps-menu.js';

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
			this.scrollLeft = window.innerWidth; // Start scrolled to the first page of apps.
			this.focus();
		}
	}
	
	render() {
		return html`
			<ideal-all-apps-menu></ideal-all-apps-menu>
			<ideal-launcher-pins></ideal-launcher-pins>
		`;
	}
}

window.customElements.define('ideal-launcher-pane', IdealLauncherPane);
