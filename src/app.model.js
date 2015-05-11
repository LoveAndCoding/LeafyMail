define([
	'backbone',
	'accounts/account.collection'
], function (Backbone, AccountCollection) {
	
	var AppModel = Backbone.Model.extend({
		
		defaults: {
			layout: 'leafy',
			accounts: new AccountCollection()
		}
		
	});
	
	return AppModel;
});