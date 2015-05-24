define([
	'underscore',
	'backbone',
	'marionette',
	'messages/message.list.indiv.view',
	'text!../../templates/messagelist.html'
], function (_, Backbone, Marionette, MessageListIndivView,  MessageListTemplate) {
	
	var MessagesListView = Marionette.CompositeView.extend({
		
		template: _.template(MessageListTemplate),
		
		childView: MessageListIndivView,
		childViewContainer: '.message-list',
		
		initialize: function () {
			
		}
		
	});
	
	return MessagesListView;
	
});