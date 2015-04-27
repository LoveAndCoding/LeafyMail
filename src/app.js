var gui = require('nw.gui'),
	win = gui.Window.get();

// win.showDevTools();

$('#close').click(function () {
	win.close();
});
$('#dev-tools').click(function () {
	win.showDevTools();
});
$('#maximize').click(function () {
	if(currWinMode == 'maximized') {
		win.unmaximize();
		$(document.body).hide().show();
	} else
		win.maximize();
});
$('#minimize').click(function () {
	win.minimize();
});
$('#refresh').click(function () {
	saveWindowState();
	window.location.reload();
});

$('body > .loading-pane').remove();

$('#primary-nav a').click(function () {
	$('#primary-nav .current').removeClass('current');
	$(this).addClass('current');
});