import {LitElement, html, css} from 'https://unpkg.com/lit-element@2.4.0/lit-element.js?module';

import {narrowWindowThreshold, cardCSS} from '/scripts/shared_css_snippets.js';

import '/components/ideal-launcher-pins.js';
import '/components/ideal-all-apps-menu.js';

export class IdealLauncherApps extends LitElement {
	
	static get styles() {
		return css`
			:host {
				${cardCSS}
				
				display: flex;
				flex-wrap: nowrap;
				gap: 8px;
				
				overflow-x: scroll;
				scroll-snap-type: x mandatory;
				scroll-snap-stop: always;
			}
			
			h1 {
				font-size: 1em;
				padding: 0 8px;
			}
			
			ideal-launcher-pins,
			ideal-all-apps-menu {
				box-sizing: border-box;
				width: 100%;
				flex-shrink: 0;
				overflow-y: auto;
				scroll-snap-align: start;
			}
				ideal-launcher-pins {
					padding-right: 0;
				}
				ideal-all-apps-menu {
					width: calc(100% - 48px);
				}
					ideal-all-apps-menu mwc-list-item {
						height: 48px;
						--mdc-list-item-graphic-size: 32px;
					}
				
				:host::-webkit-scrollbar,
				ideal-all-apps-menu::-webkit-scrollbar {
					height: 4px;
					width: 4px;
				}
				:host::-webkit-scrollbar-track,
				ideal-all-apps-menu::-webkit-scrollbar-track {
					background: rgba(255, 255, 255, 0);
				}
				:host::-webkit-scrollbar-thumb,
				ideal-all-apps-menu::-webkit-scrollbar-thumb {
					background: rgba(128, 128, 128, 0.5);
				}
				:host::-webkit-scrollbar-button,
				ideal-all-apps-menu::-webkit-scrollbar-button {
					display: none;
				}
			
			@media (min-width: ${narrowWindowThreshold}) {
				:host {
					max-height: min(512px, 75vh);
				}
				ideal-all-apps-menu {
					width: 300px;
				}
				ideal-launcher-pins {
					width: calc(6 * var(--app-tile-size-small) + 5 * var(--app-tile-gap));
				}
			}

		`;
	}
	
	static get properties() {
		return {
			open: { type: Boolean, reflect: true }
		};
	}
	
	render() {
		return html`
			<ideal-all-apps-menu></ideal-all-apps-menu>
			<ideal-launcher-pins></ideal-launcher-pins>
		`;
	}
}

window.customElements.define('ideal-launcher-apps', IdealLauncherApps);
