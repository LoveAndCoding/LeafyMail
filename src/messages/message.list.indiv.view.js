define([
	'marionette',
	'text!../../templates/messagelistitem.html'
], function (Marionette, MessageListItemTempalte) {
	
	var MessageListIndivView = Marionette.ItemView.extend({
		
		tagName: 'li',
		template: _.template(MessageListItemTempalte)
		
	});
	
	return MessageListIndivView;
	
});