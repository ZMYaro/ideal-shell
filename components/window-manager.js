import { LitElement, html, css } from 'lit';

import './window.js';

export class IdealWindowManager extends LitElement {
	
	static get styles() {
		return css`
			:host {
				display: block;
				position: absolute;
				inset: 0;
				overflow: hidden;
			}
			.snap-zone {
				position: absolute;
				width: var(--snap-zone-size);
				height: var(--snap-zone-size);
				box-sizing: border-box;
				--bg-opacity: 0.2;
				border: 1px solid rgb(255 255 255 / var(--bg-opacity));
				box-shadow: inset 0 0 0 1px rgb(0 0 0 / var(--bg-opacity));
				background-color: rgb(250 250 250 / var(--bg-opacity));
				
				z-index: var(--z-system-panes);
				
				transition-duration: calc(0.5 * var(--ui-transition-duration));
				visibility: hidden;
				
				&:hover {
					--bg-opacity: 0.4;
				}
			}
			#zone-split-nw {
				left: 0;
				top: var(--system-bar-height);
				transform: translateX(-100%) translateY(-100%);
			}
			#zone-split-ne {
				right: 0;
				top: var(--system-bar-height);
				transform: translateX(100%) translateY(-100%);
			}
			#zone-split-se {
				right: 0;
				bottom: 0;
				transform: translateX(100%) translateY(100%);
			}
			#zone-split-sw {
				left: 0;
				bottom: 0;
				transform: translateX(-100%) translateY(100%);
			}
			#zone-split-left,
			#zone-split-right {
				height: auto;
				top: calc(var(--system-bar-height) + var(--snap-zone-size));
				bottom: var(--snap-zone-size);
			}
				#zone-split-left {
					left: 0;
					transform: translateX(-100%);
				}
				#zone-split-right {
					right: 0;
					transform: translateX(100%);
				}
			#zone-close,
			#zone-maximize {
				width: auto;
				left: calc(var(--snap-zone-size));
				right: calc(var(--snap-zone-size));
			}
				#zone-close {
					top: var(--system-bar-height);
					transform: translateY(-100%);
				}
				#zone-maximize {
					bottom: 0;
					transform: translateY(100%);
				}
			
			:host(.dragging) {
				touch-action: none;
				
				.snap-zone {
					transform: translateX(0) translateY(0) !important;
					visibility: visible;
				}
				
				::slotted(ideal-window) {
					pointer-events: none;
				}
			}
		`;
	}
	
	/** {Object} */
	drag;
	/** @private {Array<IdealWindow>} */
	_windowList
	
	_boundDragStartHandler;
	_boundDragMoveHandler;
	_boundDragEndHandler;
	
	constructor() {
		super();
		this._windowList = [];
		this._boundDragStartHandler = this._handleDragStart.bind(this);
		this._boundDragMoveHandler = this._handleDragMove.bind(this);
		this._boundDragEndHandler = this._handleDragEnd.bind(this);
	}
	
	/**
	 * @override
	 */
	connectedCallback() {
		super.connectedCallback();
		window.addEventListener('pointermove', this._boundDragMoveHandler);
		window.addEventListener('pointerup', this._boundDragEndHandler);
		window.addEventListener('pointercancel', this._boundDragEndHandler);
		this.addEventListener('pointerout', this._boundDragEndHandler);
		
		// TODO: Remove this when the app launcher is implemented.
		this.openWindow('https://example.com', '#808080');
		this.openWindow('https://paintz.app', '#3f51b5');
	}
	
	/**
	 * @override
	 */
	disconnectedCallback() {
		window.removeEventListener('pointermove', this._boundDragMoveHandler);
		window.removeEventListener('pointerup', this._boundDragEndHandler);
		window.removeEventListener('pointercancel', this._boundDragEndHandler);
		this.removeEventListener('pointerout', this._boundDragEndHandler);
		super.disconnectedCallback();
	}
	
	/**
	 * Open a new window.
	 * @param {String} url - The URL of the web app to open in the window
	 * @param {String} color - CSS primary color for the app
	 */
	openWindow(url, color) {
		let newWindow = document.createElement('ideal-window');
		newWindow.src = url;
		newWindow.color = color;
		newWindow.addEventListener('windowdragstart', this._boundDragStartHandler);
		this._windowList.push(newWindow);
		this.appendChild(newWindow);
		this._recalculateZIndeces();
	}
	
	/**
	 * @private
	 * Move a window to the end of the window list and visually in front of the others
	 * @param {IdealWindow} win - The window to bring to the front
	 */
	_bringWindowToFront(win) {
		const winIndex = this._windowList.indexOf(win);
		if (winIndex === -1) { return; }
		this._windowList.splice(winIndex, 1);
		this._windowList.push(win);
		this._recalculateZIndeces();
	}
	
	/**
	 * @private
	 * Recalculate the z-indeces of all the windows based on their order in the window list
	 */
	_recalculateZIndeces() {
		this._windowList.forEach((win, i) => {
			win.style.zIndex = i;
		});
	}
	
	/**
	 * @private
	 * 
	 * @param {PointerEvent} ev
	 */
	_handleDragStart(ev) {
		if (this.drag) {
			this._handleDragEnd();
		}
		this.drag = {
			window: ev.currentTarget,
			initial: {
				x: ev.currentTarget.x,
				y: ev.currentTarget.y,
				width: ev.currentTarget.innerWidth,
				height: ev.currentTarget.innerHeight
			},
			pointerStart: {
				x: ev.pageX,
				y: ev.pageY
			},
			type: ev.direction || 'move'
		};
		if (ev.direction) {
			this.style.cursor = `${ev.direction}-resize`;
		} else {
			this.style.cursor = 'move';
		}
		
		// Move the window to the top.
		this._bringWindowToFront(ev.currentTarget);
		
		ev.currentTarget.classList.add('dragging');
		this.classList.add('dragging');
	}
	
	/**
	 * @private
	 * 
	 * @param {PointerEvent} ev
	 */
	_handleDragMove(ev) {
		if (!this.drag) { return; }
		
		let pointerDelta = {
			x: ev.pageX - this.drag.pointerStart.x,
			y: ev.pageY - this.drag.pointerStart.y
		};
		
		if (this.drag.type === 'move') {
			this.drag.window.x =
				this.drag.initial.x + pointerDelta.x;
			this.drag.window.y =
				this.drag.initial.y + pointerDelta.y;
			return;
		}
	}
	
	/**
	 * @private
	 * 
	 * @param {PointerEvent} ev
	 */
	_handleDragEnd(ev) {
		if (!this.drag ||
			(ev.type === 'pointerout' && ev.target !== ev.currentTarget)) { return; }
		
		this.style.removeProperty('cursor');
		this.drag.window.classList.remove('dragging');
		this.classList.remove('dragging');
		delete this.drag;
		
	}
	
	/**
	 * @override
	 */
	render() {
		return html`
			<div class="snap-zone" id="zone-split-nw"></div>
			<div class="snap-zone" id="zone-split-ne"></div>
			<div class="snap-zone" id="zone-split-se"></div>
			<div class="snap-zone" id="zone-split-sw"></div>
			<div class="snap-zone" id="zone-split-left"></div>
			<div class="snap-zone" id="zone-split-right"></div>
			<div class="snap-zone" id="zone-maximize"></div>
			<div class="snap-zone" id="zone-close"></div>
			<slot></slot>
		`;
	}
}

window.customElements.define('ideal-window-manager', IdealWindowManager);
