define([
	'jquery',
	'backbone',
	'appbar/appbar.model',
	'appbar/appbar.view',
	'welcome/welcome.view'
], function ($, Backbone, AppBarModel, AppBarView, WelcomeView) {
	'use strict';
	
	var AppView = Backbone.View.extend({
		el: 'body',
		
		initialize: function () {
			this.appbar = new AppBarView({ model: new AppBarModel() });
			this.views = [];
			
			if(this.model.get('accounts').length === 0) {
				var welcome = new WelcomeView({model : this.model});
				welcome.$el.addClass('flex-pane-center');
				this.views.push(welcome);
			}
		},
		
		render: function () {
			this.$el.html('');
			this.appbar.render();
			this.$el.append(this.appbar.$el);
			
			for(var v = 0, l = this.views.length; v < l; v++) {
				this.views[v].render();
				this.$el.append(this.views[v].$el);
			}
			
			return this;
		},
		
		setDeveloperMode: function () {
			this.appbar.model.set('isDebug', true);
			return this;
		}
	});
	
	return AppView;
});