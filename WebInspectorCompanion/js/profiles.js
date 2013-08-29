/*
*  Copyright 2011-2013 Research In Motion Limited.
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

/*global window, document, console, alert, setTimeout */

var running = true;

function updatePhysics() {
	"use strict";
	var i = 0;
	for (i = 0; i < 1000; ++i) {
	}
}

function updateGraphics() {
	"use strict";
	var i = 0;
	for (i = 0; i < 10000; ++i) {
	}
}

function renderScene() {
	"use strict";
	var i = 0;
	for (i = 0; i < 100; ++i) {
	}
}

function runSimulation() {
	"use strict";

	var start = (new Date()).getTime();
	var now = (new Date()).getTime();
	while (now - start < 5000) {
		updatePhysics();
		updateGraphics();
		renderScene();
		now = (new Date()).getTime();
	}
	toast("Complete!");
}

function autoProfile() {
	console.profile("runSimulation");
	runSimulation();
	console.profileEnd();
}