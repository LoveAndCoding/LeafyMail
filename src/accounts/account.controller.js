define([
	'underscore',
	'controller'
], function (_, Controller) {
	
	var AccountController = Controller.extend({
		
		handers: {
			'account:add' : 'createAccount'
		},
		
		createAccount: function (options) {
			return this.collection.create(arguments, {parse:true});
		}
		
	});
	
	return AccountController;
	
});