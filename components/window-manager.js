import { LitElement, html, css } from 'lit';

import './window.js';

export class IdealWindowManager extends LitElement {
	
	static get styles() {
		return css`
			:host {
				display: block;
				position: absolute;
				inset: 0;
				top: var(--system-bar-height);
				overflow: visible;
			}
			.snap-zone {
				position: absolute;
				width: var(--snap-zone-size);
				height: var(--snap-zone-size);
				
				box-sizing: border-box;
				--bg-opacity: 0.2;
				
				z-index: var(--z-system-panes);
				
				transition-duration: var(--ui-transition-duration);
				opacity: 0;
				visibility: hidden;
					
				&::before {
					/* Visual indicator of snap zone. */
					content: '';
					display: block;
					position: absolute;
					inset: var(--padding-panel);
					
					border: 1px solid rgb(255 255 255 / var(--bg-opacity));
					border-radius: var(--corner-radius-panel);
					box-shadow: inset 0 0 0 1px rgb(0 0 0 / var(--bg-opacity));
					background-color: rgb(250 250 250 / var(--bg-opacity));
				}
			}
			#zone-split-nw {
				left: 0;
				top: 0;
			}
			#zone-split-ne {
				right: 0;
				top: 0;
			}
			#zone-split-se {
				right: 0;
				bottom: 0;
			}
			#zone-split-sw {
				left: 0;
				bottom: 0;
			}
			#zone-split-w,
			#zone-split-e {
				height: auto;
				top: var(--snap-zone-size);
				bottom: var(--snap-zone-size);
			}
				#zone-split-w {
					left: 0;
				}
				#zone-split-e {
					right: 0;
				}
			#zone-close,
			#zone-maximize {
				width: auto;
				left: calc(var(--snap-zone-size));
				right: calc(var(--snap-zone-size));
			}
				#zone-close {
					top: 0;
				}
				#zone-maximize {
					bottom: 0;
				}
			
			#snap-zone-preview {
				pointer-events: none;
				
				--bg-opacity: 0.4;
				opacity: 1;
				
				transition-duration: 0;
				transition-property: left, top, right, bottom, width, height;
				visibility: hidden;
				
				&.visible {
					transition-duration: var(--ui-transition-duration);
					visibility: visible;
				}
			}
			
			:host(.dragging) {
				touch-action: none;
				
				.snap-zone {
					visibility: visible;
					opacity: 1;
					
					&:has(~ #snap-zone-preview.visible) {
						opacity: 0;
					}
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
	
	/** @private {HTMLElement} */
	_activeSnapZone;
	/** @private {HTMLElement} */
	_snapPreview;
	
	_boundBringToFront;
	_boundDragStartHandler;
	_boundDragMoveHandler;
	_boundDragEndHandler;
	
	constructor() {
		super();
		this._windowList = [];
		this._boundBringToFront = this._bringWindowToFront.bind(this);
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
		this.openWindow('https://example.com', 'Example', '#808080');
		this.openWindow('https://paintz.app', 'PaintZ', '#3f51b5');
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
	 * @override
	 */
	firstUpdated() {
		this._snapPreview = this.shadowRoot.getElementById('snap-zone-preview');
	}
	
	/**
	 * Open a new window.
	 * @param {String} url - The URL of the web app to open in the window
	 * @param {String} defaultTitle - The default title of the app
	 * @param {String} color - CSS primary color for the app
	 */
	openWindow(url, defaultTitle, color) {
		let newWindow = document.createElement('ideal-window');
		newWindow.src = url;
		newWindow.windowTitle = defaultTitle;
		newWindow.color = color;
		newWindow.addEventListener('pointerdown', this._boundBringToFront);
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
	 * @param {PointerEvent} ev - Passed up from the window
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
	 * @private
	 *
	 * @param {PointerEvent} ev
	 */
	_handleSnapZoneHover(ev) {
		if (this._activeSnapZone) {
			this._handleSnapZoneLeave();
		}
		this._activeSnapZone = ev.target;
		
		let startStyles = getComputedStyle(this._activeSnapZone),
			endStyles = { width: 'auto', height: 'auto' };
		this._snapPreview.style.width = startStyles.width;
		this._snapPreview.style.height = startStyles.height;
		
		if (['zone-split-nw', 'zone-split-ne', 'zone-split-w', 'zone-split-e'].includes(this._activeSnapZone.id)) {
			this._snapPreview.style.top = startStyles.top;
			endStyles.top = '0px';
		}
		if (['zone-split-sw', 'zone-split-se', 'zone-split-w', 'zone-split-e', 'zone-maximize'].includes(this._activeSnapZone.id)) {
			this._snapPreview.style.bottom = startStyles.bottom;
			endStyles.bottom = '0px';
		}
		if (['zone-split-nw', 'zone-split-sw', 'zone-split-w'].includes(this._activeSnapZone.id)) {
			this._snapPreview.style.left = startStyles.left;
			endStyles.width = '50%';
		}
		if (['zone-split-ne', 'zone-split-se', 'zone-split-e'].includes(this._activeSnapZone.id)) {
			this._snapPreview.style.right = startStyles.right;
			endStyles.width = '50%';
		}
		if (['zone-split-nw', 'zone-split-ne', 'zone-split-se', 'zone-split-sw'].includes(this._activeSnapZone.id)) {
			endStyles.height = '50%';
		}
		if ('zone-maximize' === this._activeSnapZone.id) {
			this._snapPreview.style.left = startStyles.left;
			this._snapPreview.style.right = startStyles.right;
			this._snapPreview.style.height = startStyles.height;
			endStyles.left =
				endStyles.right = '0px';
			endStyles.height = '100%';
		}
		
		this._snapPreview.classList.add('visible');
		this._snapPreview.offsetTop; // Recompute before setting end styles.
		for (let [prop, value] of Object.entries(endStyles)) {
			this._snapPreview.style[prop] = value;
		}
	}
	
	/**
	 *
	 */
	_handleSnapZoneLeave() {
		if (!this._activeSnapZone) { return; }
		this._activeSnapZone.style.removeProperty('visibility');
		this._snapPreview.classList.remove('visible');
		for (let prop of ['left', 'top', 'right', 'bottom', 'width', 'height']) {
			this._snapPreview.style.removeProperty(prop);
		}
		delete this._activeSnapZone;
	}
	
	/**
	 * @override
	 */
	render() {
		return html`
			<div class="snap-zone" id="zone-split-nw" @pointerenter="${this._handleSnapZoneHover}" @pointerleave="${this._handleSnapZoneLeave}"></div>
			<div class="snap-zone" id="zone-split-ne" @pointerenter="${this._handleSnapZoneHover}" @pointerleave="${this._handleSnapZoneLeave}"></div>
			<div class="snap-zone" id="zone-split-se" @pointerenter="${this._handleSnapZoneHover}" @pointerleave="${this._handleSnapZoneLeave}"></div>
			<div class="snap-zone" id="zone-split-sw" @pointerenter="${this._handleSnapZoneHover}" @pointerleave="${this._handleSnapZoneLeave}"></div>
			<div class="snap-zone" id="zone-split-w"  @pointerenter="${this._handleSnapZoneHover}" @pointerleave="${this._handleSnapZoneLeave}"></div>
			<div class="snap-zone" id="zone-split-e"  @pointerenter="${this._handleSnapZoneHover}" @pointerleave="${this._handleSnapZoneLeave}"></div>
			<div class="snap-zone" id="zone-maximize" @pointerenter="${this._handleSnapZoneHover}" @pointerleave="${this._handleSnapZoneLeave}"></div>
			<div class="snap-zone" id="zone-close"></div>
			<div class="snap-zone" id="snap-zone-preview"></div>
			<slot></slot>
		`;
	}
}

window.customElements.define('ideal-window-manager', IdealWindowManager);
