define([
	'underscore',
	'backbone',
	'marionette'
], function (_, Backbone, Marionette) {
	
	var controllerOptions = ['channel', 'radio', 'model', 'collection', 'view', 'events', 'handlers'];
	
	function Controller(options) {
		
		_.extend(this, _.pick(options, controllerOptions));
		if(!options.radio) {
			this.setRadio(options.channel);
		} else {
			this.radio = options.radio;
			this._delegateEvents();
		}
		
		this.initialize.apply(this, arguments);
	}
	
	_.extend(Controller.prototype, Backbone.Events, {
		
		// No-op initialize
		initialize : function () {},
		
		setRadio : function (channel) {
			this.channel = channel || 'global';
			this._undelegateEvents();
			this.radio = Backbone.Wreqr.radio.channel(this.channel || 'global');
			this._delegateEvents();
		},
		
		_delegateEvents : function () {
			if(!this.radio) return;
			
			_.each(this.events, (function (cb, eventName) {
				this.radio.vent.on(eventName, typeof cb === 'string' ? this[cb] : cb, this);
			}).bind(this));
			
			_.each(this.handlers, (function (handler, handleName) {
				this.radio.reqres.setHandler(handleName, typeof handler === 'string' ? this[handler] : handler, this);
			}).bind(this));
		},
		
		_undelegateEvents : function () {
			if(!this.radio) return;
			
			this.radio.vent.off(null, null, this);
			if(this.handlers) {
				_.each(this.handlers, (function (cb, handleName) {
					this.radio.reqres.removeHandler(handleName);
				}).bind(this));
			}
		}
		
	});
	
	
	// Behind the scenes all backbone extends are the same function.
	// Use that to make our own as well
	Controller.extend = Backbone.Model.extend
	
	return Controller;
	
});