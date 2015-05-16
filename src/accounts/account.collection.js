define([
	'backbone',
	'marionette',
	'backboneLocalstorage',
	'accounts/account.model'
], function (Backbone, Marionette, Store, AccountModel) {
	
	var AccountCollection = Backbone.Collection.extend({
		
		localStorage : new Store('UserAccountCollection'),
		
		model : AccountModel,
		
		initialize : function () {
			this.fetch();
			
			this.radio = Backbone.Wreqr.radio.channel('global');
			var self = this;
			
			this.radio.reqres.setHandler('account:add', function (options) {
				var added = self.create(options, {parse:true});
				return added;
			});
			
			// this.on('change', this.sync.bind(this));
		}
		
	});
	
	return AccountCollection;
});