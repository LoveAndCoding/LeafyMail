$('<div>', {
	'class' : 'welcome-page flex-pane-center'
}).appendTo('body').load('templates/welcome-1.html', function () {
		$('.welcome-page form').on('submit', function (e) {
			e.preventDefault();
			
			alert('Submitting');
		});
		
		$('body > .loading-pane').remove();
	});