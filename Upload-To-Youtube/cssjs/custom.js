function loading() {
	if (localStorage.loadpage == 'one') {
		document.getElementById('loadthis').setSelectedText('Load This Screen')
		}
	if (localStorage.loadpage == 'two') {
		document.getElementById('loadthis').setSelectedText('Launch Video Camera')
		newUpload()
		}
	if (localStorage.loadpage == 'three') {
		document.getElementById('loadthis').setSelectedText('Launch File Picker')
		fileUpload()
		}
	blackberry.event.addEventListener('onaccesschanged', function (accessible, status) {
		if (status === 'unregistered') {
			blackberry.bbm.platform.register({
				uuid: '20243c79-1886-4774-a03a-d46523932d1d'
			});
		} else if (status === 'allowed') {
			bbm.registered = accessible;
		}
	}, false)
}

function fileUpload() {
	blackberry.invoke.card.invokeFilePicker({
		mode: blackberry.invoke.card.FILEPICKER_MODE_PICKER, 
		viewMode: blackberry.invoke.card.FILEPICKER_VIEWER_MODE_GRID, 
		sortBy: blackberry.invoke.card.FILEPICKER_SORT_BY_NAME, 
		sortOrder: blackberry.invoke.card.FILEPICKER_SORT_ORDER_ASCENDING}, function (path) {
			blackberry.invoke.invoke({
				target: "Youtube", 
				action: "bb.action.SHARE", 
				uri: 'file://'+path,
			})
		})
}

function newUpload() {
	var mode = blackberry.invoke.card.CAMERA_MODE_VIDEO;
	blackberry.invoke.card.invokeCamera(mode, function (path) {
			blackberry.invoke.invoke({
				target: "Youtube", 
				action: "bb.action.SHARE", 
				uri: 'file://'+path,
			})
		})
}

function appWorld() {
    blackberry.invoke.invoke({
        target: "sys.appworld",
        uri: "appworld://vendor/4735"
    });
}