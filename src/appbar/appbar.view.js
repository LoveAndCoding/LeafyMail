define([
	'jquery',
	'underscore',
	'backbone',
	'winstate',
	'text!../../templates/appbar.html'
], function ($, _, Backbone, WindowState, AppBarTemplate) {
	
	var AppBarView = Backbone.View.extend({
		
		id: 'topbar',
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
			window.location.reload();
		},
		
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
		
	});
	
	return AppBarView;
});