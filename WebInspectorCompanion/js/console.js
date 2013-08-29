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

/*global window, document, console, blackberry */

function generateError() {
	"use strict";
	blackberry.doesntexist.doSomething();
}

function logMsg() {
	"use strict";
	console.log("This is a message from your application.");
}

function logWarning() {
	"use strict";
	console.warn("Danger, Will Robertson. Danger!");
}

function onSuccess() {
	console.log("Invocation successful.");
}
function onError() {
	console.warn("Invocation failed.");
}
function openBrowserBad() {
	blackberry.wrong.api.name({
		target: "sys.browser",
		uri: "http://www.blackberry.com"
	}, onSuccess, onError);
}

function openBrowser() {
	blackberry.invoke.invoke({
		target: "sys.browser",
		uri: "http://www.blackberry.com"
	}, onSuccess, onError);
}