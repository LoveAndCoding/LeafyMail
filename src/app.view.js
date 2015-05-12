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
			this.showChildView('appbar', new AppBarView({ model: new AppBarModel() }) );
			
			if(this.model.get('accounts').length === 0) {
				this.showChildView('main', new WelcomeView({model : this.model}) );
			}
		},
		
		render: function () {
			
			
			return this;
		},
		
		setDeveloperMode: function () {
			this.appbar.currentView.model.set('isDebug', true);
			return this;
		}
	});
	
	return AppView;
});