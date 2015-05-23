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
			var mailboxes = this.get('mailboxes');
			if(!mailboxes.length) {
				// Default mailboxes
				mailboxes.create({
					alias: 'Inbox',
					name: 'INBOX',
					iconClass: 'fa-envelope-o',
					open: true
				});
				mailboxes.create({
					name: 'Drafts',
					iconClass: 'fa-file'
				});
				mailboxes.create({
					name: 'Sent',
					iconClass: 'fa-send-o'
				});
				mailboxes.create({
					name: 'Archive',
					iconClass: 'fa-archive'
				});
				mailboxes.create({
					name: 'Junk',
					iconClass: 'fa-fire'
				});
				mailboxes.create({
					name: 'Trash',
					iconClass: 'fa-trash-o'
				});
				mailboxes.create({
					name: 'Outbox',
					iconClass: 'fa-inbox'
				});
			}
			
			this.radio = Backbone.Wreqr.radio.channel('global');
		}
		
	});
	
	return AppModel;
});