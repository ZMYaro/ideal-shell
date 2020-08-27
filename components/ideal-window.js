import {LitElement, html, css} from 'https://unpkg.com/lit-element@2.4.0/lit-element.js?module';

export class IdealWindow extends LitElement {

	static get styles() {
		return css`
			:host {
				display: block;
				position: fixed;
				
				--title-bar-height: 32px;
			}
				:host.maximized,
				:host.fullscreen {
					left: 0 !important;
					top: 0 !important;
					right: 0 !important;
					bottom: 0 !important;
				}
			
			.title-bar {
				position: absoluet;
				left: 0;
				top: 0;
				right: 0;
				height: var(--title-bar-height);
				
				cursor: ${this.drag ? css`move` : css`default`};
				transform: ${!this.fullscreen || this.drag ? css`none` : css`translateY(-var(--title-bar-height))`};
				transition: transform 0.2s;
			}
			.contents {
				position: absolute;
				left: 0;
				top: ${this.fullscreen ? css`0` : css`var(--title-bar-height)`};
				width: 100%;
				height: ${!this.fullscreen ? css`calc(100% - var(--title-bar-height))` : css`100%`};
				
				border: 0;
			}
			
			.cover {
				display: ${this.dragging ? css`block` : css`none`};
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
				
				/* TODO: Remove color */
				background-color: rgba(255, 255, 255, 0.4);
			}
		`;
	}
	
	static get properties() {
		return {
			src: { type: String, reflect: true },
			x: { type: Number, reflect: true },
			y: { type: Number, reflect: true },
			width: { type: Number, reflect: true },
			height: { type: Number, reflect: true },
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
		this.y = 32;
		this.width = 512;
		this.height = 512;
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
		this.classList.toggle('maximized', this.maximized);
		this.classList.toggle('fullscreen', this.fullscreen);
		if (!this.maximized && !this.fullscreen) {
			this.style.left = this.x + 'px';
			this.style.top = this.y + 'px';
			this.style.width = this.width + 'px';
			this.style.height = this.height + 'px';
		}
		
		return html`
			<iframe src="${this.src}" class="contents" @load="handleAppNavigate"></iframe>
			<div class="title-bar" style="background-color: ${this.color};"></div>
			<div class="cover"></div>
		`;
	}
}

window.customElements.define('ideal-window', IdealWindow);
