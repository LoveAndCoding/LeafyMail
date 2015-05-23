var ConnectionManager = require('./src/utils/connection.js');

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
			
			// Don't store the password
			delete opts.password;
			
			opts.connected = false;
			// this.connect(pass);
			
			return Backbone.Model.apply(this, arguments);
		},
		
		initialize: function () {
			this.cm = new ConnectionManager(this.toJSON());
			this.cm.on('connected', (function () {
				this.set('connected', true);
			}).bind(this));
			this.cm.on('disconnected', (function () {
				this.set('connected', false);
			}).bind(this));
			
			this.connect();
		},
		
		destroy: function () {
			this.cm.disconnect();
		},
		
		getUserPassword: function () {
			return this.radio.reqres.request('modal:new', {
				template: PasswordPromptTemplate,
				view: new PasswordPromptView,
				model: this.toJSON(),
				window: {
					width: 300,
					height: 150
				}
			});
		},
		
		connect: function (password) {
			var passprom;
			
			if(password) {
				passprom = Promise.resolve(password);
			} else {
				passprom = this.getUserPassword();
			}
			
			this.connection = passprom.then((function (password) {
				return this.cm.connect(password);
			}).bind(this));
			
			this.connection.then(this.ready.bind(this), this.error.bind(this));
			
			return this;
		},
		
		disconnect: function () {
			this.cm.disconnect();
		},
		
		then: function () {
			return this.connection.then.apply(this.connection, arguments);
		},
		
		getBoxes: function () {
			return this.cm.getBoxes();
		},
		
		getMessages: function (box) {
			if(typeof box === 'object')
				box = box.name;
			
			return this.cm.getMessages('Inbox');
		},
		
		ready: function (connection) {
		},
		
		error: function (err) {
			console.error('Account connection failed', err);
		}
		
	});
	
	return AccountModel;
});