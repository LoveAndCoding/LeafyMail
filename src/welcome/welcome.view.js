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
			this.radio = Backbone.Wreqr.radio.channel('global');
		},
		
		render: function () {
			this.$el.html('');
			this.$el.append(this.template(this.model.toJSON())).addClass('flex-pane-center');
			return this;
		},
		
		addAccount: function (e) {
			e.preventDefault();
			
			this.$el.find('input').attr('disabled', true);
			
			this.$el.find('.status-message').text('').append($('<i>').addClass('fa fa-circle-o-notch fa-spin'), 'Searching for server');
			var self = this,
				r = this.radio.reqres.request('account:add', {
					email : this.$el.find('input[type=email]').val(),
					password : this.$el.find('input[type=password]').val()
				});
			
			r.then(function () {
				// TODO Account added, remove welcome
				self.radio.commands.execute('welcome:complete');
			}, function (message) {
				self.$el.find('input').attr('disabled', false);
				self.$el.find('.status-message').text(message);
			});
		}
	});
	
	return WelcomeView;
});