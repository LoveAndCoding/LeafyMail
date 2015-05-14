var IMAP = require('imap'),
	IMAP_DEFAULTS = {
		tlsOptions: {
			rejectUnauthorized: false
		}
	};

define([
	'underscore',
	'backbone',
	'accounts/knownservers'
], function (_, Backbone, KnownServers) {
	
	var AccountModel = Backbone.Model.extend({
		
		defaults: {
			
		},
		
		constructor: function (opts) {
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
			
			if(opts.useAt === true) {
				opts.user = opts.email
			} else {
				opts.user = opts.email.split('@');
				opts.user.pop();
				opts.user = opts.user.join('@');
			}
			
			this.connect(opts);
			
			// Don't store the password
			delete opts.password;
			
			console.log('Creating New Account', opts, domain);
			
			return Backbone.Model.apply(this, arguments);
		},
		
		connect: function (opts) {
			var connOpts = _.clone(opts),
				self = this;
			_.extend(connOpts, IMAP_DEFAULTS);
			
			this.connection = new Promise(function (resolve, reject) {
				self._imap = new IMAP(connOpts);
				
				self._imap.on('error', reject.bind(this));
				self._imap.on('ready', resolve.bind(this, self._imap));
				
				self._imap.connect();
			});
			
			this.connection.then(this.ready.bind(this), this.error.bind(this));
			
			return this;
		},
		
		then: function () {
			this.connection.then.apply(this.connection, arguments);
		},
		
		ready: function (connection) {
			console.log('Account connection ready', this.toJSON(), connection);
		},
		
		error: function (err) {
			console.error('Account connection failed', err);
		}
		
	});
	
	return AccountModel;
});