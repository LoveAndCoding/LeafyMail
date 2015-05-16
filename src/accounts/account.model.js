var IMAP = require('imap'),
	IMAP_DEFAULTS = {
		tlsOptions: {
			rejectUnauthorized: false
		}
	};

define([
	'underscore',
	'backbone',
	'accounts/knownservers',
	'accounts/passwordprompt.view',
	'text!../../templates/passwordprompt.html'
], function (_, Backbone, KnownServers, PasswordPromptView, PasswordPromptTemplate) {
	
	var AccountModel = Backbone.Model.extend({
		
		defaults: {
			connected: false
		},
		
		constructor: function (opts) {
			var email = opts.email,
				pass = opts.password,
				domain = email.substr(email.lastIndexOf('@') + 1);
			
			this.radio = Backbone.Wreqr.radio.channel('global');
			
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
			
			opts.connected = false;
			this.connect(opts);
			
			// Don't store the password
			delete opts.password;
			
			return Backbone.Model.apply(this, arguments);
		},
		
		destroy: function () {
			this.disconnect();
		},
		
		getUserPassword: function (options) {
			return this.radio.reqres.request('modal:new', {
				template: PasswordPromptTemplate,
				view: new PasswordPromptView,
				model: options,
				window: {
					width: 300,
					height: 150
				}
			});
		},
		
		connect: function (opts) {
			var connOpts = _.clone(opts),
				self = this,
				passprom;
			_.extend(connOpts, IMAP_DEFAULTS);
			
			if(connOpts.password) {
				passprom = Promise.resolve(connOpts.password);
			} else {
				passprom = this.getUserPassword(connOpts);
			}
			
			this.connection = passprom.then(function (password) {
				connOpts.password = password;
				return new Promise(function (resolve, reject) {
					self._imap = new IMAP(connOpts);
					
					self._imap.on('error', reject.bind(this));
					self._imap.on('ready', resolve.bind(this, self._imap));
					
					self._imap.connect();
				});
			});
			
			this.connection.then(this.ready.bind(this), this.error.bind(this));
			
			return this;
		},
		
		disconnect: function () {
			if(this._imap && this._imap.state !== 'disconnected') {
				this._imap.end();
			}
		},
		
		then: function () {
			return this.connection.then.apply(this.connection, arguments);
		},
		
		getBoxes: function () {
			var self = this;
			return this.then(function () {
				return new Promise(function (resolve, reject) {
					self._imap.getBoxes(function (err, boxes) {
						if(err) {
							reject(err);
						} else {
							resolve(boxes);
						}
					});
				});
			});
		},
		
		ready: function (connection) {
			this.set('connected', true);
		},
		
		error: function (err) {
			console.error('Account connection failed', err);
		}
		
	});
	
	return AccountModel;
});