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
				
				display: none;
			}
			#zone-split-left,
			#zone-split-right {
				height: auto;
				top: var(--snap-zone-size);
				bottom: var(--snap-zone-size);
			}
				#zone-split-left {
					left: 0;
				}
				#zone-split-right {
					right: 0;
				}
			
			:host(.dragging) {
				touch-action: none;
			}
				:host(.dragging) ::slotted(ideal-window) {
					pointer-events: none;
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
			<div class="snap-zone" id="zone-split-left"></div>
			<div class="snap-zone" id="zone-split-right"></div>
			<div class="snap-zone" id="zone-maximize"></div>
			<div class="snap-zone" id="zone-minimize"></div>
			<slot></slot>
		`;
	}
}

window.customElements.define('ideal-window-manager', IdealWindowManager);
