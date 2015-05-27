var IMAP = require('imap'),
	IMAP_DEFAULTS = {
		tlsOptions: {
			rejectUnauthorized: false
		}
	},
	MailParser = require('mailparser').MailParser,
	Promise = require('promise'),
	_ = require('underscore'),
	util = require('util'),
	EventEmitter = require('events').EventEmitter;

function ConnectionManager (connectionOptions) {
	// Make sure to call EventEmitter constructor
	EventEmitter.call(this);
	
	this.__connected = false;
	this.__changingBoxes = false;
	this.__currentBox;
	this.__currentMailboxObj;
	this.__connectionOptions = _.extend(_.clone(IMAP_DEFAULTS), connectionOptions);
	this.__queue = [];
}

// Make Event Emitter
util.inherits(ConnectionManager, EventEmitter);
// Alias emit -> trigger for sanity's sake
ConnectionManager.prototype.trigger = function () {
	return EventEmitter.prototype.emit.apply(this, arguments);
};

ConnectionManager.prototype.connect = function (password) {
	var opts = _.clone(this.__connectionOptions);
	opts.password = password;
	
	this.__promise = new Promise((function (resolve, reject) {
		this._imap = new IMAP(opts);
		
		this._imap.on('error', reject.bind(this));
		this._imap.on('ready', resolve.bind(this, this._imap));
		
		this._imap.connect();
	}).bind(this)).then((function () {
		this.__connected = true;
		this._executeQueue();
		
		this.emit('connected', opts);
		
		this._imap.on('mail', this._newMessage.bind(this));
		
		this._imap.on('close', (function (hadError) {
			this.__connected = false;
			if(this.__connectionOptions.autoReconnect && !hadError) {
				this.connect(password);
				this.emit('reconnecting');
			} else {
				this.emit('disconnected');
			}
		}).bind(this));
	}).bind(this));
	
	return this.__promise;
};

ConnectionManager.prototype.disconnect = function (force) {
	this.__connectionOptions.autoReconnect = false;
	if(this._imap) {
		if(force) {
			this.__connected = false;
			this._imap.destroy();
		} else {
			this._imap.end();
		}
	}
	
	return this;
};

ConnectionManager.prototype.isConnected = function () {
	return this.__connected;
};

ConnectionManager.prototype.getCurrentBox = function () {
	return this.__connected ? this.__currentBox : undefined;
};

ConnectionManager.prototype.getBoxes = function () {
	var self = this;
	return new Promise(function (resolve, reject) {
		self._imap.getBoxes(function (err, boxes) {
			if(err) {
				reject(err);
			} else {
				resolve(boxes);
			}
		});
	});
};

ConnectionManager.prototype._queueCommand = function(execute, cancelCB) {
	var store = {},
		p = new Promise(function (resolve, reject) {
			store.resolve = resolve;
			store.reject = reject;
		});
	
	p.resolve = store.resolve;
	p.reject = store.reject;
	p.next = p.then(execute.bind(this), cancelCB ? cancelCB.bind(this) : null);
	
	this.__queue.push(p);
	if(this.__queue.length === 1)
		this._executeQueue();
	return p.next;
};

ConnectionManager.prototype._executeQueue = function () {
	if(this.__queue.length === 0)
		return Promise.resolve();
	else if (!this.isConnected())
		return Promise.reject();
	
	var commandPromise = this.__queue.shift();
	commandPromise.resolve();
	commandPromise.next.then(this._executeQueue.bind(this), this._executeQueue.bind(this));
	
	return commandPromise.next;
};

ConnectionManager.prototype._clearQueue = function () {
	// Reset the array so rejection doesn't run things
	var oldQueue = this.__queue;
	this.__queue = [];
	
	for(var q = 0, l = oldQueue.length; q < l; q++) {
		oldQueue.shift().reject();
	}
	
	return this;
};

ConnectionManager.prototype.getMessages = function (boxName, limit, starting) {
	var self = this;
	this.__changingBoxes = true;
	return this._queueCommand(function () {
		return new Promise(function(resolve, reject) {
			var procFn = function (mailbox) {
				limit = typeof limit === 'undefined' ? 100 : limit;
				starting = starting || ( limit ? Math.max(0, mailbox.messages.total - limit + 1) : 1 );
				
				var messages = [],
					promises = [],
					f = self._imap.seq.fetch(starting+':'+(limit ? Math.min(mailbox.messages.total, starting + limit) : '*'), { bodies: 'HEADER', struct: true });
				f.on('message', function (msg, seqno) {
					promises.push(new Promise(function (rslv, rej) {
						var num = '(Message #'+seqno+') ',
							attr;
						msg.on('body', function (stream, info) {
							var mp = new MailParser();
							
							mp.on('end', function (mail) {
								messages[seqno] = mail;
								messages[seqno].attributes = attr;
								messages[seqno].seqNo = seqno;
								rslv();
							});
							
							stream.pipe(mp);
						});
						
						msg.once('attributes', function (attrs) {
							attr = attrs;
						});
						msg.once('end', function () {
							if(messages[seqno]) messages[seqno].attributes = attr;
						});
						// 10 second timeout in case stream is very slow
						setTimeout(rej.bind(this), 10000);
					}));
				});
				f.once('error', function(err) {
					reject('Fetch error: ' + err);
				});
				f.once('end', function() {
					Promise.all(promises).then(function () {
						resolve(messages);
					});
				});
			};
			
			if(self.__currentBox != boxName) {
				self._imap.openBox(boxName, function (err, mailbox) {
					if(err) {
						return reject('Unable to open Inbox');
					}
					
					self.__changingBoxes = false;
					self.__currentBox = boxName;
					self.__currentMailboxObj = mailbox;
					procFn(mailbox);
				});
			} else {
				procFn(self.__currentMailboxObj);
			}
		});
	});
};

ConnectionManager.prototype._newMessage = function (numNewMessages) {
	this.emit('getting mail', numNewMessages);
	if(!this.__changingBoxes) {
		this.getMessages(this.__currentBox, numNewMessages).then((function (messages) {
			this.emit(/* you've got */ 'mail', this.__currentBox, messages);
		}).bind(this)).then(null, (function (err) {
			this.emit('error', err);
		}).bind(this));
	}
};

// ConnectionManager.prototype.

module.exports = ConnectionManager;