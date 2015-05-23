define([
	'underscore',
	'controller',
	'accounts/account.controller',
	'mailboxes/mailbox.controller'
], function (_, Controller, AccountController, MailboxController) {
	
	var AppController = Controller.extend({
		
		initialize: function () {
			this.accountController = new AccountController({
				collection: this.model.get('accounts')
			});
			this.mailboxController = new MailboxController({
				collection: this.model.get('mailboxes')
			});
		}
		
	});
	
	return AppController;
	
});