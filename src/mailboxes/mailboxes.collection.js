define([
	'backbone',
	'backboneLocalstorage',
	'mailboxes/mailboxes.model'
], function (Backbone, Store, MailboxModel) {
	
	var MailboxCollection = Backbone.Collection.extend({
		
		model: MailboxModel,
		localStorage: new Store('MailboxCollection')
		
	});
	
	return MailboxCollection;
	
});