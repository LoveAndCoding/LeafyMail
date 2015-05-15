define([
	'backbone',
	'accounts/account.collection',
	'window/modal.collection',
	'mailboxes/mailboxes.collection'
], function (Backbone, AccountCollection, ModalCollection, MailboxCollection) {
	
	var AppModel = Backbone.Model.extend({
		
		defaults: {
			layout: 'leafy',
			modalStack: new ModalCollection(),
			accounts: new AccountCollection(),
			mailboxes: new MailboxCollection()
		},
		
		initialize: function () {
			// Default mailboxes
			this.get('mailboxes').create({
				name: 'Inbox',
				iconClass: 'fa-inbox',
				open: true
			});
		}
		
	});
	
	return AppModel;
});