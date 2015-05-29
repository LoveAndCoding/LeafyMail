var NwBuilder = require('node-webkit-builder');
var nw = new NwBuilder({
	files: ['./**', '!./cache/**', '!./build/**', '!./node_modules/node-webkit-builder/**'],
	platforms: ['win', 'osx', 'linux'],
	version: '0.12.2',
	winIco: './images/icon.ico'
});

function zeroFill(num) {
	return num < 10 ? '0' + num : '' + num;
}

nw.on('log',  function () {
	var args = Array.prototype.slice.call(arguments),
		now = new Date();
	args.unshift(zeroFill(now.getHours()) + ':' + zeroFill(now.getMinutes()) + ':' + zeroFill(now.getSeconds()) +' -');
	console.log.apply(console, args);
});
nw.build().then(function () {
	console.log('Build Successful');
}).catch(function (error) {
	console.error('Build Failed: ', error);
});