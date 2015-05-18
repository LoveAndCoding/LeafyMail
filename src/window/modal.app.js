define([
	'underscore',
	'backbone',
	'marionette'
], function (_, Backbone, Marionette) {
	
	var ModalWindowView = Backbone.Model.extend({
		
		initialize: function (options) {
			var html = _.template(options.template)(options.model || {}),
				windowOpts = {
					position: 'center',
					toolbar: false,
					resizable: false,
					frame: false,
					show: false,
					show_in_taskbar: false,
					focus: true,
					transparent: true,
					icon: 'icon.png'
				},
				self = this,
				isResolved = false;
			
			_.extend(windowOpts, options.window || {});
			
			this.promise = new Promise(function (resolve, reject) {
				self.subWindow = gui.Window.open('src/window/modal.html', windowOpts);
				self.rootView = options.view;
				self.rootView.resolve = resolve;
				self.rootView.reject = reject;
				self.subWindow.once('document-end', function () {
					self.subWindow.window.document.body.innerHTML += html;
					self.focus();
					
					if(self.rootView)
						self.rootView.setElement(self.subWindow.window.document.body);
				});
				self.subWindow.once('closed', function () {
					self.subWindow = null;
					if(!isResolved)
						reject();
					
					if(self.collection)
						self.collection.remove(self);
				});
				
				self.subWindow.requestAttention(2);
			});
			
			this.promise.then(function () { isResolved = true; if(self.subWindow) self.subWindow.close(); }, function () { if(self.subWindow) self.subWindow.close(); });
		},
		
		focus: function () {
			if(this.subWindow) {
				this.subWindow.show();
				this.subWindow.focus();
			}
		},
		
		forceClose: function () {
			if(this.subWindow)
				this.subWindow.close(true);
		},
		
		then: function () {
			return this.promise.then.apply(this.promise, arguments);
		}
		
	});
	
	return ModalWindowView;
	
});