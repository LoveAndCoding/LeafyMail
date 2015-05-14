define([
	'jquery',
	'backbone',
	'marionette',
	'appbar/appbar.model',
	'appbar/appbar.view',
	'welcome/welcome.view'
], function ($, Backbone, Marionette, AppBarModel, AppBarView, WelcomeView) {
	'use strict';
	
	var AppView = Marionette.LayoutView.extend({
		el: 'body',
		
		regions: {
			appbar : '#top',
			main : '#primary'
		initialize: function () {
			this.radio = Backbone.Wreqr.radio.channel('global');
			
			this.showChildView('appbar', new AppBarView({ model: new AppBarModel() }) );
			
			this.renderMainView();
		},
		
		render: function () {
			
			
			return this;
		},
		
		renderMainView: function () {
			var self = this;
			if(this.main && this.main.currentView)
				this.getRegion('main').reset();
			
			if(this.model.get('accounts').length === 0) {
				this.radio.commands.setHandler('welcome:complete', function () {
					self.renderMainView();
				});
				this.showChildView('main', new WelcomeView({model : this.model}) );
			} else {
				// TODO
			}
		},
		
		setDeveloperMode: function () {
			this.appbar.currentView.model.set('isDebug', true);
			return this;
		}
	});
	
	return AppView;
});