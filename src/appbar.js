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