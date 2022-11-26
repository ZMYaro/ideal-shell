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
				cursor: pointer;
				
				width: var(--app-tile-size-medium);
				height: var(--app-tile-size-medium);
			}
				:host([size="small"]) {
					width: var(--app-tile-size-small);
					height: var(--app-tile-size-small);
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
				.icon-fg {
					top: -4px;
				}
			.title {
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				padding: 2px;
				font-size: 0.75rem;
				text-align: center;
				white-space: nowrap;
				color: white;
				background-color: rgba(0, 0, 0, 0.25);
			}
				:host([size="small"]) .title {
					//display: none;
					font-size: 0.5rem;
					padding: 1px;
				}
				:host([text-color="dark"]) .title,
				:host([text-color="mixed"]) .title {
					background-color: rgba(0, 0, 0, 0.4);
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
