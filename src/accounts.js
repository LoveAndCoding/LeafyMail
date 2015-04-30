// Includes
$.getScript('src/login.js')
	.done(function () {
		var accounts = JSON.parse(localStorage.getItem('leafymail.accounts') || 'false');
		
		if(!accounts) {
			$.getScript('src/welcome.js');
		} else {
			
		}
	});

