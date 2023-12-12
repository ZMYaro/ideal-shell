import {LitElement, html, css} from 'https://unpkg.com/lit-element@2.4.0/lit-element.js?module';

export class IdealQSTile extends LitElement {
	
	static get styles() {
		return css`
			:host {
				display: inline-flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				
				border-radius: var(--corner-radius-tile);
				user-select: none;
				cursor: pointer;
				overflow: hidden;
				
				background-color: var(--color-bg-tile);
				color: var(--color-on-bg);
				
				height: var(--qs-tile-height);
			}
				:host(:hover),
				:host(:focus) {
					filter: brightness(1.05);
				}
				:host(:active),
				:host(.active) {
					filter: brightness(0.9);
				}
				:host([checked]) {
					background-color: var(--color-accent);
					color: white;
				}
			
			.icon {
				margin: auto;
			}
			
			.text {
				justify-self: end;
				align-self: stretch;
				
				display: flex;
				align-items: center;
				
				height: 32px;
				font-size: 0.75rem; /* 12px default */
				background-color: rgba(0, 0, 0, 0.1);
			}
				.text > span {
					flex-grow: 1;
					text-align: center;
				}
				.text > mwc-icon {
					justify-self: end;
					font-size: 1rem;
					margin-inline-end: 4px;
				}
				:host([checked]) .text {
					background-color: rgba(0, 0, 0, 0.2);
				}
			
			@media (prefers-color-scheme: dark) {
				.text {
					background-color: rgba(255, 255, 255, 0.1);
				}
				:host([checked]) .text {
					background-color: rgba(0, 0, 0, 0.2);
				}
			}
		`;
	}
	
	static get properties() {
		return {
			icon: { type: String, reflect: true },
			submenu: { type: Boolean, reflect: true },
			checked: { type: Boolean, reflect: true }
		};
	}
	
	constructor() {
		super();
		
		this.tabIndex = 0;
		
		this.addEventListener('click', () => this.checked = !this.checked);
	}
	
	render() {
		return html`
			<mwc-icon class="icon">${this.icon}</mwc-icon>
			<div class="text">
				<span><slot></slot></span>
				${this.submenu ? html`<mwc-icon>chevron_right</mwc-icon>` : ''}
			</div>
		`;
	}
}

window.customElements.define('ideal-qs-tile', IdealQSTile);
