/*
 * Copyright 2013 Research In Motion Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// called by the webworks ready event
function initApp() {
	console.log('app init');
	bb.init({
		actionBarDark: true,
		controlsDark: true,
		listsDark: false,

		// Fires "before" styling is applied and "before" the screen is inserted in the DOM
		onscreenready: function(element, id) {
		},

		// Fires "after" styling is applied and "after" the screen is inserted in the DOM
		ondomready: function(element, id) {
			if (id === 'main') {
				welcome();
			}
		}
	});

	blackberry.event.addEventListener("invoked", function (invocationInfo){
		console.log("Handler start . . .");
		if (invocationInfo.target) {
			console.log("Invocation target: " + invocationInfo.target);
		}
		if (invocationInfo.type) {
			console.log("Invocation type: " + invocationInfo.type);
		}
		if (invocationInfo.action) {
			console.log("Invocation action: " + invocationInfo.action);
		}
		if (invocationInfo.data) {
			console.log("Invocation data: " + atob(invocationInfo.data));
		}
		if (invocationInfo.action && invocationInfo.action == 'bb.action.SEARCH.EXTENDED') {
			toast('Searching for...' + atob(invocationInfo.data));
		}
		console.log("Handler end . . .");
	});

	bb.pushScreen('main.html', 'main');
}


// setup window covers, and register with bbm platform
function welcome() {
	// setup the window cover (displayed when app is minimized)
	blackberry.ui.cover.setContent(blackberry.ui.cover.TYPE_IMAGE, {
		path: 'local:///cover.png'
	});
	blackberry.ui.cover.updateCover();
}


// display a toast message to the user
function toast(msg) {
	blackberry.ui.toast.show(msg);
}