define([
	'underscore',
	'controller',
	'accounts/account.controller'
], function (_, Controller, AccountController) {
	
	var AppController = Controller.extend({
		
		initialize: function () {
			this.accountController = new AccountController({
				collection: this.model.get('accounts')
			});
		}
		
	});
	
	return AppController;
	
});