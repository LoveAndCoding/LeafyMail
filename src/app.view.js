define([
	'jquery',
	'backbone',
	'appbar/appbar.model',
	'appbar/appbar.view'
], function ($, Backbone, AppBarModel, AppBarView) {
	'use strict';
	
	var AppView = Backbone.View.extend({
		el: 'body',
		
		initialize: function () {
			this.appbar = new AppBarView({ model: new AppBarModel() });
			this.views = [this.appbar];
		},
		
		render: function () {
			this.appbar.render();
			this.$el.append(this.appbar.$el);
			return this;
		},
		
		setDeveloperMode: function () {
			this.appbar.model.set('isDebug', true);
			return this;
		}
	});
	
	return AppView;
});