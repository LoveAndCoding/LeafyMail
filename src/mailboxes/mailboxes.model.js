define([
	'backbone'
], function (Backbone) {
	
	var MailboxModel = Backbone.Model.extend({
		
		defaults: {
			alias: '',
			name: '',
			iconClass: 'fa-folder-o',
			attributes: [],
			flags: [],
			unread: 0,
			total: 0,
			open: false
		}
		
	});
	
	return MailboxModel;
});