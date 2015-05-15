define([
	'backbone',
	'accounts/account.collection',
	'window/modal.collection'
], function (Backbone, AccountCollection, ModalCollection) {
	
	var AppModel = Backbone.Model.extend({
		
		defaults: {
			layout: 'leafy',
			modalStack: new ModalCollection(),
			accounts: new AccountCollection()
		}
		
	});
	
	return AppModel;
});