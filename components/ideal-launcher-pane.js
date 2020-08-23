import {html} from 'https://unpkg.com/lit-element@2.4.0/lit-element.js?module';

import {ShadowlessLitElement} from '/scripts/shadowless-lit-element.js';

export class IdealLauncherPane extends ShadowlessLitElement {

	render() {
		return html`
		`;
	}
}

window.customElements.define('ideal-launcher-pane', IdealLauncherPane);
