import {LitElement, css, html} from 'https://unpkg.com/lit-element@2.4.0/lit-element.js?module';
import 'https://unpkg.com/@material/mwc-icon@canary/mwc-icon.js?module';

export class IdealClock extends LitElement {
	
	static get styles() {
		return css`
			:host {
				letter-spacing: normal;
			}
		`;
	}
	
	static get properties() {
		return {
			time: { type: String, attribute: false }
		};
	}

	constructor() {
		super();
		
		let boundUpdateClock = this.updateClock.bind(this);
		
		this.updateClock();
		setTimeout(() => {
			// Wait until the next minute, then set the timer to update the clock on the minute.
			this.updateClock();
			setInterval(boundUpdateClock, 60000);
		}, (60 - (new Date()).getSeconds()) * 1000);
	}
	
	updateClock() {
		let now = new Date(),
			hour = now.getHours(),
			minutes = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
		this.time = `${hour}:${minutes}`;
	}
	
	render() {
		return html`
			${this.time}
		`;
	}
}

window.customElements.define('ideal-clock', IdealClock);
