import '/components/ideal-system-ui.js';
import '/components/ideal-window.js';

let systemUI;
window.addEventListener('load', init);

function init() {
	systemUI = document.getElementsByTagName('ideal-system-ui')[0];

	checkMobileWidth();
	window.addEventListener('resize', checkMobileWidth);
	
}

function checkMobileWidth() {
	systemUI.mobile = (window.innerWidth < 512);
}
