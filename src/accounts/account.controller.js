define([
	'underscore',
	'controller'
], function (_, Controller) {
	
	var AccountController = Controller.extend({
		
		handers: {
			'account:add' : 'createAccount'
		},
		
		initialize: function (opts) {
			this.collection.on('change:connected', this.accountConnected.bind(this));
		},
		
		createAccount: function (options) {
			return this.collection.create(arguments, {parse:true});
		},
		
		accountConnected: function (account) {
			var self = this;
			account.getMessages('Inbox').then(function (messages) {
				self.radio.vent.trigger('mailbox:update', {mailbox:'INBOX', account: account, messages: messages});
			}).then(null, function (err) {
				// TODO
				console.log('Error getting inbox messages', err);
			});
		}
		
	});
	
	return AccountController;
	
});