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
			this.model.on('change', this.render.bind(this));
		},
		
		events: {
			'click' : 'changeBox'
		},
		
		render: function() {
			if(this.model.get('open'))
				this.$el.addClass('current');
			else
				this.$el.removeClass('current');
			
			this.$el.attr('href', '#'+encodeURIComponent(this.model.get('name')));
			this.$el.html(this.template(this.model.toJSON()));
			
			return this;
		},
		
		changeBox: function () {
			if(this.model.get('open'))
				return;
			
			_.each(this.model.collection.where({open:true}), function (item) {
				item.set('open', false);
			});
			this.model.set('open', true);
		}
	});
	
	return MailboxMenuView;
	
});