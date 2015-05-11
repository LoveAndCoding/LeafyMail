define([
	'backbone',
	'backboneLocalstorage',
	'accounts/account.model'
], function (Backbone, Store, AccountModel) {
	
	var AccountCollection = Backbone.Collection.extend({
		
		localStorage : new Store('UserAccountCollection'),
		
		model : AccountModel
		
	});
	
	return AccountCollection;
});