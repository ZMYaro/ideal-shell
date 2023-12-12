import {LitElement, css, html} from 'https://unpkg.com/lit-element@2.4.0/lit-element.js?module';

import '/components/battery-icon.js';
import '/components/quick-settings.js';

export class IdealActionPane extends LitElement {
	
	static get styles() {
		return css`
			.top-status-area {
				display: flex;
				justify-content: space-between;
				padding: var(--padding-card);
				
				--mdc-icon-size: 1rem;
				font-size: 0.75rem;
			}
		`;
	}
	
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
			<div class="top-status-area">
				<div style="display: inline-flex; align-items: center; gap: 0.25em;">
					<mwc-icon>alarm_off</mwc-icon>
					No alarms set
				</div>
				<ideal-battery-icon showpercentage></ideal-battery-icon>
			</div>
			<ideal-quick-settings></ideal-quick-settings>
		`;
	}
}

window.customElements.define('ideal-action-pane', IdealActionPane);
