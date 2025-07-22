import { LitElement, html, css } from 'lit';

export class IdealWindow extends LitElement {
	
	static get styles() {
		return css`
			:host {
				display: block;
				position: fixed;
				
				/* Mirror to custom properties since CSS can't pull from custom attributes. */
				left: var(--x);
				top: var(--y);
				width: var(--inner-width);
				height: calc(var(--inner-height) + var(--window-title-bar-height));
			}
				:host([maximized]),
				:host([fullscreen]) {
					left: 0;
					top: var(--system-bar-height);
					right: 0;
					bottom: 0;
					width: auto;
					height: auto;
				}
				:host([fullscreen]) {
					top: 0;
					bottom: calc(-1 * var(--window-title-bar-height));
				}
			
			.title-bar {
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				height: var(--window-title-bar-height);
				
				background-color: var(--color);
			}
				:host(.dragging) .title-bar {
					cursor: move;
				}
			
			.contents {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: calc(100% - var(--window-title-bar-height));
				
				border: 0;
				background-color: var(--color);
			}
			.resizer {
				position: absolute;
				opacity: 0;
				/* Dark and desaturated version of primary color. */
				background-color: oklch(from var(--color) 0.25 calc(0.5 * c) h);
			}
				.resizer:hover {
					opacity: 0.4;
				}
				.resizer-n,
				.resizer-s {
					left: 0;
					right: 0;
					height: var(--window-grabbable-border-width);
				}
				.resizer-w,
				.resizer-e {
					top: 0;
					bottom: 0;
					width: var(--window-grabbable-border-width);
				}
				.resizer-n {
					top: calc(-1 * var(--window-grabbable-border-width));
					bottom: auto;
					cursor: n-resize;
				}
				.resizer-e {
					right: calc(-1 * var(--window-grabbable-border-width));
					left: auto;
					cursor: e-resize;
				}
				.resizer-s {
					bottom: calc(-1 * var(--window-grabbable-border-width));
					top: auto;
					cursor: s-resize;
				}
				.resizer-w {
					left: calc(-1 * var(--window-grabbable-border-width));
					right: auto;
					cursor: w-resize;
				}
				.resizer-n.resizer-e {
					cursor: ne-resize;
					border-top-right-radius: var(--window-grabbable-border-width);
				}
				.resizer-s.resizer-e {
					cursor: se-resize;
					border-bottom-right-radius: var(--window-grabbable-border-width);
				}
				.resizer-s.resizer-w {
					cursor: sw-resize;
					border-bottom-left-radius: var(--window-grabbable-border-width);
				}
				.resizer-n.resizer-w {
					cursor: nw-resize;
					border-top-left-radius: var(--window-grabbable-border-width);
				}
			
			.drag-cover {
				display: none;
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
				
				cursor: move;
				
				/* Translucent color overlay. */
				background-color: oklch(from var(--color) 0.25 calc(0.5 * c) h / 0.25);
			}
				:host(.dragging) .drag-cover {
					display: block;
				}
		`;
	}
	
	static get properties() {
		return {
			src: { type: String, reflect: true },
			x: { type: Number, reflect: true },
			y: { type: Number, reflect: true },
			innerWidth: { type: Number, reflect: true },
			innerHeight: { type: Number, reflect: true },
			color: { type: String, reflect: true },
			maximized: { type: Boolean, reflect: true },
			fullscreen: { type: Boolean, reflect: true },
			drag: { type: Object, attribute: false }
		};
	}
	
	constructor() {
		super();
		
		// Set default values.
		this.x = 32;
		this.y = 64;
		this.innerWidth = 512;
		this.innerHeight = 512;
		this.color = '#808080';
		this.maximized = false;
		this.fullscreen = false;
		this.drag = undefined;
	}
	
	handleAppNavigate(ev) {
		// TODO
		console.log('Window navigated:');
		console.log(ev);
	}
	
	handleDrag(ev) {
		// TODO
	}
	
	render() {
		// Mirror to custom properties since CSS can't pull from custom attributes.
		this.style.setProperty('--color', this.color);
		this.style.setProperty('--x', `${this.x}px`);
		this.style.setProperty('--y', `${this.y}px`);
		this.style.setProperty('--inner-width', `${this.innerWidth}px`);
		this.style.setProperty('--inner-height', `${this.innerHeight}px`);
		this.classList.toggle('dragging', !!this.drag);
		
		return html`
			<iframe src="${this.src}" class="contents" @load="${this.handleAppNavigate}"></iframe>
			<div class="title-bar"></div>
			<div class="resizer resizer-n"></div>
			<div class="resizer resizer-n resizer-e"></div>
			<div class="resizer resizer-e"></div>
			<div class="resizer resizer-s resizer-e"></div>
			<div class="resizer resizer-s"></div>
			<div class="resizer resizer-s resizer-w"></div>
			<div class="resizer resizer-w"></div>
			<div class="resizer resizer-n resizer-w"></div>
			<div class="drag-cover"></div>
		`;
	}
}

window.customElements.define('ideal-window', IdealWindow);
