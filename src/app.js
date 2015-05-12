var gui = require('nw.gui'),
	win = gui.Window.get();

// win.showDevTools();

requirejs.config({
	nodeRequire: require,
	baseUrl: 'src',
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		backboneLocalstorage: {
			deps: ['backbone'],
			exports: 'Store'
		},
		marionette: {
			deps: ['backboneLocalstorage'],
			exports: 'Store'
		},
		winstate: {
			exports: 'WindowState'
		}
	},
	paths: {
		winstate: '../lib/winstate',
		jquery: '../node_modules/jquery/dist/jquery',
		underscore: '../node_modules/underscore/underscore',
		backbone: '../node_modules/backbone/backbone',
		backboneLocalstorage: '../node_modules/backbone.localstorage/backbone.localStorage',
		marionette: '../node_modules/backbone.marionette/lib/backbone.marionette',
		text: '../node_modules/requirejs-text/text'
	}
});

win.show();

requirejs([
	'jquery',
	'marionette',
	'app.model',
	'app.view'
], function ($, Marionette, AppModel, AppView) {
	
	var app = new Marionette.Application();
	
	app.rootModel = new AppModel();
	app.rootView = new AppView({
		model : app.rootModel
	});
	
	app.rootView.setDeveloperMode();
	// app.render();
	
	$('body > .loading-pane').remove();
});

// $.getScript('src/appbar.js');
// $.getScript('src/accounts.js');

// $('body > .loading-pane').remove();

// $('#primary-nav a').click(function () {
	// $('#primary-nav .current').removeClass('current');
	// $(this).addClass('current');
// });