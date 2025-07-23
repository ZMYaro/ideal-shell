import '/components/system-ui.js';

let systemUI;
window.addEventListener('load', init);

function init() {
	systemUI = document.getElementsByTagName('ideal-system-ui')[0];

	window.addEventListener('resize', checkMobileWidth);
	checkMobileWidth();
}

function checkMobileWidth() {
	systemUI.mobile = (window.innerWidth < 512);
}
