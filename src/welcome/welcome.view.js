define([
	'underscore',
	'jquery',
	'backbone',
	'marionette',
	'text!../../templates/welcome.html'
], function (_, $, Backbone, Marionette, WelcomeTemplate) {
	'use strict';
	
	var WelcomeView = Marionette.CompositeView.extend({
		
		template: _.template(WelcomeTemplate),
		className: 'welcome-page',
		
		events: {
			'submit form' : 'addAccount'
		},
		
		initialize: function () {
		},
		
		render: function () {
			this.$el.html('');
			this.$el.append(this.template(this.model.toJSON())).addClass('flex-pane-center');
			return this;
		},
		
		addAccount: function (e) {
			e.preventDefault();
			
			this.$el.find('.status-message').append($('<i>').addClass('fa fa-circle-o-notch fa-spin'), 'Searching for server');
		}
	});
	
	return WelcomeView;
});