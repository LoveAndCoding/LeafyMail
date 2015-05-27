define([
	'jquery',
	'backbone',
	'marionette',
	'appbar/appbar.model',
	'appbar/appbar.view',
	'welcome/welcome.view',
	'app.primary.view'
], function ($, Backbone, Marionette, AppBarModel, AppBarView, WelcomeView, AppPrimaryView) {
	'use strict';
	
	var AppView = Marionette.LayoutView.extend({
		el: 'body',
		
		regions: {
			appbar : '#top',
			main : '#primary'
		},
		
		initialize: function () {
			var self = this;
			
			this.stack = this.model.get('modalStack');
			this.radio = Backbone.Wreqr.radio.channel('global');
			
			this.showChildView('appbar', new AppBarView({ model: new AppBarModel() }) );
			
			this.renderMainView();
			
			win.on('focus', function () {
				win.blur();
				if(self.stack && self.stack.length > 0) {
					self.stack.at(self.stack.length - 1).focus();
				}
				return false;
			});
			
			this.radio.vent.on('application:reload', this.forceCloseModals.bind(this));
			win.on('close', this.forceCloseModals.bind(this));
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
				this.showChildView('main', new AppPrimaryView({
					model : this.model,
					collection: this.model.get('mailboxes')}
				));
			}
		},
		
		setDeveloperMode: function () {
			this.appbar.currentView.model.set('isDebug', true);
			return this;
		},
		
		forceCloseModals: function () {
			while(this.stack.length) {
				this.stack.pop().forceClose();
			}
		}
	});
	
	return AppView;
});