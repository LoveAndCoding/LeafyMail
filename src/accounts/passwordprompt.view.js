define([
	'underscore',
	'jquery',
	'backbone',
	'marionette'
], function (_, $, Backbone, Marionette, WelcomeTemplate) {
	'use strict';
	
	var PasswordPromptView = Backbone.View.extend({
		events: {
			'submit form' : 'resolvePromise'
		},
		
		initialize: function () {
		},
		
		resolvePromise: function (e) {
			e.preventDefault();
			var currWindow = gui.Window.get(),
				currVal = this.$el.find('input[type=password]').val();
			
			if($(this.el.ownerDocument.activeElement).hasClass('cancel')) {
				this.reject();
			} else if(currVal) {
				this.resolve(currVal);
			}
		}
	});
	
	return PasswordPromptView;
});