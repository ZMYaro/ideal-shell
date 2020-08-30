import {LitElement, html, css, unsafeCSS} from 'https://unpkg.com/lit-element@2.4.0/lit-element.js?module';

export class IdealAppTile extends LitElement {
	
	APP_ICON_DIR = 'images/app_icons/';
	
	static get styles() {
		return css`
			:host {
				display: inline-block;
				position: relative;
				text-align: center;
				border-radius: 4px;
				user-select: none;
				overflow: hidden;
				outline: 0 none;
				cursor: pointer;
				
				--tile-size: 48px;
				width: var(--tile-size);
				height: var(--tile-size);
			}
				:host([size="medium"]) {
					--tile-size: 100px;
				}
				:host(:hover),
				:host(:focus) {
					filter: brightness(1.05);
				}
				:host(:active),
				:host(.active) {
					filter: brightness(0.9);
				}
			.icon-bg,
			.icon-fg {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
			}
			.title {
				position: absolute;
				left: 0;
				right: 0;
				bottom: 2px;
				font-size: 0.75rem;
				text-align: center;
				white-space: nowrap;
				color: white;
				text-shadow: 0 1px 16px rgba(0, 0, 0, 0.75);
			}
				:host([size="small"]) .title {
					display: none;
				}
				:host([text-color="dark"]) .title {
					color: black;
				}
				:host([text-color="mixed"]) .title {
					text-shadow: 0 1px 8px #000;
				}
		`;
	}
	
	static get properties() {
		return {
			size: { type: String, reflect: true }, // 'small', 'medium'
			icon: { type: String, reflect: true },
			bg: { type: String, reflect: true },
			textColor: { typp: String, reflect: true, attribute: 'text-color' }
		};
	}
	
	constructor() {
		super();
		
		this.tabIndex = 0;
		
		this.size = this.size || 'medium';
		
		this.addEventListener('click', this.handleClick);
	}
	
	handleClick() {
		let launchEvent = new CustomEvent('app-launch', {
			detail: {
				
			}
		});
	}
	
	render() {
		return html`
			<img src="${this.bg}" alt="" class="icon-bg" />
			<img src="${this.icon}" alt="" class="icon-fg" />
			<div class="title"><slot></slot></div>
		`;
	}
}

window.customElements.define('ideal-app-tile', IdealAppTile);
