define([
	'backbone'
], function (Backbone) {
	
	var MailboxModel = Backbone.Model.extend({
		
		defaults: {
			name: '',
			iconClass: 'fa-folder-open-o',
			attributes: [],
			flags: [],
			unread: 0,
			total: 0,
			open: false
		}
		
	});
	
	return MailboxModel;
});