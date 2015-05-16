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
			
			this.get('accounts').on('change:connected', this.processConnectedAccount.bind(this));
		},
		
		processConnectedAccount: function (account, isConnected) {
			var self = this;
			if(isConnected) {
				account.getBoxes().then(function (boxes) {
					
					function processBox(set, parent) {
						_.each(set, function (mailbox, name) {
							var mailboxes = self.get('mailboxes');
							// Filter out [Gmail] folder name
							if(name.toLowerCase() !== '[gmail]') {
								if(mailboxes.findWhere({name: name}) || name == 'Spam') {
									// Already there, will want to add to
									
								} else {
									// Folder with this name does not exist, create
									mailboxes.create({
										name: name,
										parent: parent,
										attributes: mailbox.attribs
									});
								}
							}
							if(mailbox.children)
								processBox(mailbox.children, name);
						});
					}
					
					console.log('Adding boxes for connected account', account, boxes);
					
					processBox(boxes);
					
				}); // TODO Error handling
				
			} else {
				// TODO Disconnected, need to handle/notify
			}
		}
		
	});
	
	return AppModel;
});