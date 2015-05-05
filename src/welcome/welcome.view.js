define([
	'underscore',
	'jquery',
	'backbone',
	'text!../../templates/welcome.html'
], function (_, $, Backbone, WelcomeTemplate) {
	'use strict';
	
	var WelcomeView = Backbone.View.extend({
		
		template: _.template(WelcomeTemplate),
		className: 'welcome-page',
		
		events: {
			'submit form' : 'addAccount'
		},
		
		initialize: function () {
		},
		
		render: function () {
			this.$el.html('');
			this.$el.append(this.template(this.model.toJSON()));
			return this;
		},
		
		addAccount: function (e) {
			e.preventDefault();
			
			this.$el.find('.status-message').append($('<i>').addClass('fa fa-circle-o-notch fa-spin'), 'Searching for server');
		}
	});
	
	return WelcomeView;
});