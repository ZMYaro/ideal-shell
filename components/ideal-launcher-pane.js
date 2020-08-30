import {html} from 'https://unpkg.com/lit-element@2.4.0/lit-element.js?module';

import {ShadowlessLitElement} from '/scripts/shadowless-lit-element.js';
import '/components/ideal-launcher-pin-screen.js';
import '/components/ideal-all-apps-menu.js';

export class IdealLauncherPane extends ShadowlessLitElement {
	
	static get properties() {
		return {
			open: { type: Boolean, reflect: true }
		};
	}
	
	constructor() {
		super();
		
		// Make menu container focusable.
		this.tabIndex = -1;
		
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
			this.scrollLeft = 0;
			this.focus();
		}
	}
	
	render() {
		return html`
			<ideal-launcher-pin-screen></ideal-launcher-pin-screen>
			<ideal-all-apps-menu></ideal-all-apps-menu>
		`;
	}
}

window.customElements.define('ideal-launcher-pane', IdealLauncherPane);
