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
			this.radio = Backbone.Wreqr.radio.channel('global');
			var self = this;
			
			this.radio.reqres.setHandler('account:add', function (options) {
				self.create(options);
				return Promise.reject('Unable to add account. Feature not implemented');
			});
		}
		
	});
	
	return AccountCollection;
});