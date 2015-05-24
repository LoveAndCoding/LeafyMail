define([
	'jquery',
	'backbone',
	'marionette',
	'mailboxes/mailbox.menu.list.view',
	'messages/messages.list.view',
	'text!../templates/leafy.html'
], function ($, Backbone, Marionette, MailboxMenuView, MessageListView, LeafyTemplate) {
	'use strict';
	
	var AppPrimaryView = Marionette.LayoutView.extend({
		
		template: _.template(LeafyTemplate),
		
		id: 'primary',
		
		initialize: function () {
			this.radio = Backbone.Wreqr.radio.channel('global');
			this.currentMailbox = this.collection.findWhere({open: true});
		},
		
		onShow: function () {
			this.addRegions({
				'nav': '#primary-nav',
				'emails': '#email-list'
			});
			
			this.showChildView('nav', new MailboxMenuView({
				collection: this.collection
			}));
			this.showChildView('emails', new MessageListView({
				el: '#email-list',
				model: this.currentMailbox,
				collection: this.currentMailbox.get('messages')
			}));
			
		}
	});
	
	return AppPrimaryView;
});