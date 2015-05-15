define([
	'underscore',
	'backbone',
	'marionette',
	'window/modal.app'
], function (_, Backbone, Marionette, ModalApp) {
	
	var ModalCollection = Backbone.Collection.extend({
		
		initialize: function () {
			this.radio = Backbone.Wreqr.radio.channel('global');
			
			this.radio.reqres.setHandler('modal:new', this.create.bind(this));
		},
		
		create: function (options) {
			var modal = new ModalApp(options),
				self = this;
			
			this.push(modal);
			modal.once('closed', function () {
				self.remove(modal);
				modal = null;
			});
			
			return modal;
		}
		
	});
	
	return ModalCollection;
	
});