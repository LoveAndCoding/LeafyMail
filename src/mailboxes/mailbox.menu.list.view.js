define([
	'marionette',
	'mailboxes/mailbox.menu.view'
], function (Marionette, MailboxMenuView) {
	
	var MailboxMenuListView = Marionette.CollectionView.extend({
		
		tagName: 'nav',
		id: 'primary-nav',
		childView: MailboxMenuView
		
	});
	
	return MailboxMenuListView;
	
});