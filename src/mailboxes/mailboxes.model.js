define([
	'backbone',
	'messages/messages.collection',
	'messages/message.model'
], function (Backbone, MessageCollection, MessageModel) {
	
	var MailboxModel = Backbone.Model.extend({
		
		defaults: {
			alias: '',
			name: '',
			iconClass: 'fa-folder-o',
			attributes: [],
			flags: [],
			unread: 0,
			total: 0,
			open: false,
			messages: null
		},
		
		initialize: function (opts) {
			this.set('messages', new MessageCollection(null, {box:this}));
		},
		
		parse: function (values) {
			for(var i = 0, l = values.messages.length; i < l; i++)
				values.messages[i] = new MessageModel(values.messages[i]);
			values.messages = new MessageCollection(values.messages,{box:this});
			return values;
		}
		
	});
	
	return MailboxModel;
});