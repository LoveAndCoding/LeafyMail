var gui = require('nw.gui'),
	win = gui.Window.get();

// win.showDevTools();

$.getScript('src/appbar.js');
$.getScript('src/accounts.js');

// $('body > .loading-pane').remove();

// $('#primary-nav a').click(function () {
	// $('#primary-nav .current').removeClass('current');
	// $(this).addClass('current');
// });