var req_type, req_data;

function getShareTargets(data, type) {
	if (data == "") {
		alert("Nothing to share :(")
	}
	else {
		req_type = type;
		req_data = data;

		var request = {
	        "action": "bb.action.SHARE",
	        "type": req_type,
			"target_type": ["APPLICATION", "CARD"]
			};
	
		blackberry.invoke.query(request, onGetShareSuccess, onGetShareError);
	}
}

function onGetShareSuccess(response) {
	//pass for invoke request
	response[0].req_type = req_type;
	response[0].req_data = req_data;
	bb.pushScreen('targetsListScreen.html', 'targetsListScreen', response[0]);
}

function onGetShareError(error) {
    alert("error: " + error);
}

function invokePicturePicker() {
	var details = {
    	mode: blackberry.invoke.card.FILEPICKER_MODE_PICKER,
        type: [blackberry.invoke.card.FILEPICKER_TYPE_PICTURE],
		imageCropEnabled: true
    };

	blackberry.invoke.card.invokeFilePicker(details, onPickDone, onPickCancel, onPickInvoke);
}

function onPickDone(path) {
	console.log("PicturePicker Picked, path: "+path);
	document.getElementById('input_img').src = "file://" + path;
}

function onPickCancel(reason) {
	console.log("PicturePicker Cancelled, reason: "+reason);
}

function onPickInvoke(error) {
	if (error) {
		console.log("PicturePicker Invoke Error, error:" + error);
	}
	else {
		console.log("PicturePicker Invoke Success");
	}
}