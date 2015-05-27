define([
	'backbone',
	'backboneLocalstorage',
	'messages/message.model'
], function (Backbone, Store, MessageModel) {
	
	var MessageCollection = Backbone.Collection.extend({
		
		model: MessageModel,
		
		initialize: function (messages, opts) {
			this.localStorage = new Store('Mailbox.Messages'+opts.box.get('name'));
		},
		
		comparator: function (item) {
			return -1 * item.get('seqNo');
		}
		
	});
	
	return MessageCollection;
	
});