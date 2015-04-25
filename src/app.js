var gui = require('nw.gui'),
	win = gui.Window.get();

// win.showDevTools();

window.addEventListener('load', function() {
	document.getElementById('close').addEventListener('click', function () {
		win.close();
	}, false);
	document.getElementById('dev-tools').addEventListener('click', function () {
		win.showDevTools();
	}, false);
	document.getElementById('maximize').addEventListener('click', function () {
		if(currWinMode == 'maximized')
			win.unmaximize();
		else
			win.maximize();
	}, false);
	document.getElementById('minimize').addEventListener('click', function () {
		win.minimize();
	}, false);
	document.getElementById('refresh').addEventListener('click', function () {
		saveWindowState();
		window.location.reload();
	}, false);
});