import {LitElement, html} from 'https://unpkg.com/lit-element@2.4.0/lit-element.js?module';

export class IdealWindow extends LitElement {

	static get properties() {
		return {
			src: { type: String },
			x: { type: Number },
			y: { type: Number },
			width: { type: Number },
			height: { type: Number },
			color: { type: String }
		};
	}
	
	attributeChangedCallback(name, oldVal, newVal) {
		switch (name) {
			case 'x':
				this.style.left = newVal + 'px';
				break;
			case 'y':
				this.style.top = newVal + 'px';
				break;
			case 'width':
				this.style.width = newVal + 'px';
				break;
			case 'height':
				this.style.height = newVal + 'px';
				break;
		}
	}

	render() {
		return html`
			<ideal-title-bar></ideal-title-bar>
			<iframe src="${src}" class="ideal-window-contents"></iframe>
		`;
	}
}

window.customElements.define('ideal-window', IdealWindow);
