(function () {
	var Imap = require('imap')
	
	window.signIn = function (credentials) {
		return new Imap(credentials);
	};
	
})();