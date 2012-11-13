function populateTargetsList(root, object) {
	var list = root.getElementById('targetslist');
	console.log("Query object returned:");
	console.log(object);
	
	for (var i = 0; i < object.targets.length; i++) {
		var item = document.createElement('div');
		item.setAttribute('data-bb-type', 'item');
		item.setAttribute('data-bb-title', object.targets[i].label);
		item.setAttribute('onclick', "invokeTarget('"+object.targets[i].key+"', '"+object.req_data+"', '"+object.req_type+"')");
		list.appendChild(item);
	}
}

function invokeTarget(invokeTarget, req_data, req_type) {
	if (req_type == "image/*") {
    	blackberry.invoke.invoke({
        	target: invokeTarget,
			action: "bb.action.SHARE",
        	type: req_type,
        	uri: req_data
    	}, onInvokeSuccess, onInvokeError);
	}
	else if (req_type == "text/plain") {
    	blackberry.invoke.invoke({
        	target: invokeTarget,
			action: "bb.action.SHARE",
        	type: req_type,
        	data: [req_data]
    	}, onInvokeSuccess, onInvokeError);
	}
	else if (req_type == "text/url") { //bug? need to omit type
    	blackberry.invoke.invoke({
        	target: invokeTarget,
			action: "bb.action.SHARE",
			uri: req_data
    	}, onInvokeSuccess, onInvokeError);	
	}
}

function onInvokeSuccess() {
	console.log("Invocation successful!");
}

function onInvokeError(error) {
	alert("Invocation failed, error: " + error);
}