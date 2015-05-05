define([
	'backbone'
], function (Backbone) {
	
	var AppModel = Backbone.Model.extend({
		
		defaults: {
			layout: 'leafy',
			accounts: []
		}
		
	});
	
	return AppModel;
});