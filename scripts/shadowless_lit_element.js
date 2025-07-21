import { LitElement, html } from 'lit';

export class ShadowlessLitElement extends LitElement {
	createRenderRoot() {
		return this;
	}
}
