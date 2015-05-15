define([
	'jquery',
	'backbone',
	'marionette',
	'mailboxes/mailbox.menu.view',
	'text!../templates/leafy.html'
], function ($, Backbone, Marionette, MailboxMenuView, LeafyTemplate) {
	'use strict';
	
	var AppPrimaryView = Marionette.CompositeView.extend({
		
		template: _.template(LeafyTemplate),
		id: 'primary',
		childViewContainer: '#primary-nav',
		childView: MailboxMenuView,
		
		initialize: function () {
			this.radio = Backbone.Wreqr.radio.channel('global');
		}
	});
	
	return AppPrimaryView;
});