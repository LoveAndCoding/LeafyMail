define([
	'underscore',
	'backbone',
	'accounts/knownservers'
], function (_, Backbone, KnownServers) {
	
	var AccountModel = Backbone.Model.extend({
		
		defaults: {
			
		},
		
		initialize: function (opts) {
			var email = opts.email,
				pass = opts.password,
				domain = email.substr(email.lastIndexOf('@') + 1);
			
			if(opts.host) {
				// We have settings
			} else if(KnownServers[domain]) {
				_.extend(opts, KnownServers[domain]);
			} else {
				// We'll try common names with the domain
			}
			
			delete opts.password;
			
			console.log('Creating New Account', opts, domain);
		}
		
	});
	
	return AccountModel;
});