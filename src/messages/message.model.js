define([
	'backbone'
], function (Backbone) {
	
	var MessageModel = Backbone.Model.extend({
		
		defaults: {
			read: false,
			to: [],
			from: [],
			subject: '',
			replyTo: null,
			headers: {},
			priority: 'normal',
			date: null,
			contentType: '',
			uid: '',
			seqNo: 0
		},
		
		initialize: function () {
			var msg = this.toJSON();
			// Convenience properties
			this.set({
				read: msg.attributes.flags.indexOf('\\Seen') >= 0,
				contentType: msg.headers['content-type'],
				uid: msg.attributes.uid
			});
		}
		
	});
	
	return MessageModel;
	
});