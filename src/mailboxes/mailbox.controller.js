define([
	'underscore',
	'controller'
], function (_, Controller) {
	
	var MailboxController = Controller.extend({
		
		events: {
			'mailbox:update': 'mailboxMessages'
		},
		
		mailboxMessages: function (msgObj) {
			var box = this.collection.findWhere(typeof msgObj.mailbox === 'string' ? {name: msgObj.mailbox} : msgObj.mailbox),
				boxMessages = box.get('messages');
			
			for(var m = msgObj.messages.length - 1; m >= 0; m--) {
				var msg = msgObj.messages[m];
				if(!msg) {
					break;
				}
				
				boxMessages.create(msg);
			}
		}
		
	});
	
	return MailboxController;
	
});