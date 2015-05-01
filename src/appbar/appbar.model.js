define([
	'jquery',
	'underscore',
	'backbone',
	'winstate',
	'text!../../templates/appbar.html'
], function ($, _, Backbone, WindowState, AppBarTemplate) {
	
	var AppBarModel = Backbone.Model.extend({
		
		defaults: {
			title: 'LeafyMail',
			isDebug: false
		},
		
		updateTitle: function (addTitle) {
			this.set('title', 'LeafyMail' + (addTitle ? ' ' + addTitle : ''));
		}
		
	});
	
	return AppBarModel;
});