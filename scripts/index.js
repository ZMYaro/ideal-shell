import '/components/ideal-system-ui.js';
import '/components/ideal-window.js';

let systemUI;
window.addEventListener('load', init);

function init() {
	systemUI = document.getElementsByTagName('ideal-system-ui')[0];

	checkMobileWidth();
	window.addEventListener('resize', checkMobileWidth);
	
	// TODO: Remove this when the app launcher is implemented.
	//var testWindow = document.createElement('ideal-window');
	//testWindow.src = 'https://example.com';
	//document.body.appendChild(testWindow);
}

function checkMobileWidth() {
	systemUI.mobile = (window.innerWidth < 512);
}
