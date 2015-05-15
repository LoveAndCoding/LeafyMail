define([
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/mailbox.menuitem.html'
],function (_, Backbone, Marionette, MailboxMenuItemTemplate) {
	
	var MailboxMenuView = Marionette.ItemView.extend({
		tagName: 'a',
		template: _.template(MailboxMenuItemTemplate),
		
		initialize: function (opts) {
		},
		
		render: function() {
			this.$el.addClass('current');
			this.$el.attr('href', '#'+encodeURIComponent(this.model.get('name')));
			this.$el.html(this.template(this.model.toJSON()));
			
			return this;
		},
	});
	
	return MailboxMenuView;
	
});