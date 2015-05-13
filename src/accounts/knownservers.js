/**	List of Known Servers
  *	
  **/
define([],function () {
	
	var list = {
		'gmail.com' : {
			host: 'imap.gmail.com',
			port: 993,
			tls: true,
			useAt: true
		},
		'outlook.com' : {
			host: 'imap-mail.outlook.com',
			port: 993,
			tls: true,
			useAt: true
		},
		'yahoo.com' : {
			host: 'imap.mail.yahoo.com',
			port: 993,
			tls: true,
			useAt: true
		},
		'me.com': {
			host: 'mail.me.com',
			port: 993,
			tls: true,
			useAt: false
		},
		'mail.com': {
			host: 'imap.mail.com',
			port: 993,
			tls: true,
			useAt: true
		}
	};
	
	// Aliases/alternate names
	list['live.com'] = list['outlook.com'];
	list['hotmail.com'] = list['outlook.com'];
	
	return list;
	
});