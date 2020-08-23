import {LitElement, html} from 'https://unpkg.com/lit-element@2.4.0/lit-element.js?module';

export class ShadowlessLitElement extends LitElement {
	createRenderRoot() {
		return this;
	}
}
