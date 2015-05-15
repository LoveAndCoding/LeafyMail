define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'winstate',
	'text!../../templates/appbar.html'
], function ($, _, Backbone, Marionette, WindowState, AppBarTemplate) {
	
	var AppBarView = Backbone.View.extend({
		
		id: 'appbar',
		template: _.template(AppBarTemplate),
		
		initialize: function () {
			this.model.on('change', this.render.bind(this));
		},
		
		events: {
			'click #close' : 'close',
			'click #maximize' : 'toggleMaximize',
			'click #minimize' : 'minimize',
			'click #refresh' : 'refresh',
			'click #dev-tools' : 'devTools'
		},
		
		close: function () {
			win.close();
		},
		
		devTools: function () {
			win.showDevTools();
		},
		
		toggleMaximize: function () {
			if(WindowState.getMode() == 'maximized') {
				win.unmaximize();
				// Fix weird bug with rendering on unmaximize
				$(document.body).hide().show();
			} else {
				win.maximize();
			}
		},
		
		minimize: function () {
			win.minimize();
		},
		
		refresh: function () {
			WindowState.save();
			Backbone.Wreqr.radio.channel('global').vent.trigger('application:reload', {source:'appbar'});
			window.location.reload();
		},
		
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
		
	});
	
	return AppBarView;
});