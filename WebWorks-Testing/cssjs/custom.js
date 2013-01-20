function loadPage() {
if (localStorage.getItem('iframe') == 'true') {bb.pushScreen('iframe.html','iframe');}
else {bb.pushScreen('settingspage.html','settings');}
}

function unCheckAll() {
	document.getElementById('Neitherradio').setChecked()
	localStorage.clear('')
	document.getElementById('goto').innerHTML = 'You have not set the location of your WebWorks code.'
	document.getElementById('url').innerHTML = '[not set]'
}

function loadingTime () {
if (document.getElementById('iframetoggle') !=null) {
	if (localStorage.getItem('iframe') == 'true') {document.getElementById('iframetoggle').setChecked(true)}
	if (localStorage.getItem('load') == 'Landscape') { 
		document.getElementById('Landscaperadio').setChecked()
		document.getElementById('url').innerHTML = 'Your code will load in Landscape, these settings in Portrait.'
	}
	else if (localStorage.getItem('load') == 'Portrait') { 
		document.getElementById('Portraitradio').setChecked()
		document.getElementById('url').innerHTML = 'Your code will load in Portrait, these settings in Landscape.'
	}
	else if (localStorage.getItem('load') == 'Either') { 
		document.getElementById('Eitherradio').setChecked()
		document.getElementById('url').innerHTML = 'You will never see this page again (not recommended).'
	}
	else if (localStorage.getItem('load') == 'Neither') { 
		document.getElementById('Neitherradio').setChecked()
		document.getElementById('url').innerHTML = 'Next time you launch this app you will see this page.'
	}
	if (localStorage.getItem('goto') != null) { document.getElementById('goto').innerHTML = 'Your code is at <a href="' + localStorage.getItem('goto') + '">' + localStorage.getItem('goto') + '</a>.'}
	if (localStorage.getItem('goto') == null) { document.getElementById('goto').innerHTML = 'You have not set the location of your WebWorks code.'}
	if (localStorage.getItem('load') == null) { document.getElementById('url').innerHTML = 'You will see this page when you start the app.'}
	if (localStorage.getItem('hello') == null) { 
		document.getElementById('hello').style.display = ''
	}
	if (localStorage.getItem('hello') != null) { 
		document.getElementById('hello').style.display = 'none'
	}
}
if (document.getElementById('theiframe') !=null) { document.getElementById('theiframe').src = localStorage.getItem('goto')}
}