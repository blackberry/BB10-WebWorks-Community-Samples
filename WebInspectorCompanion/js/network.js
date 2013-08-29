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

// http://css-tricks.com/examples/CSS-Sprites/Example1Before/
function displayImages() {
	var ul = document.createElement("ul");
	ul.id = "nav";

	for (var i = 1; i <= 5; i++) {
		var li = document.createElement("li");
		var a = document.createElement("a");
		a.className = "item" + i;
		a.title = "Some Link " + i;
		a.innerHTML = "Item " + i;
		li.appendChild(a);

		ul.appendChild(li);
	}

	var ele = document.getElementById("normalimages");
	if (ele) {
		ele.innerHTML = "";

		ele.appendChild(ul);
	}
}

//http://css-tricks.com/examples/CSS-Sprites/Example1After/
function displaySprites() {
	var ul = document.createElement("ul");
	ul.id = "spriteNav";

	for (var i = 1; i <= 5; i++) {
		var li = document.createElement("li");
		var a = document.createElement("a");
		a.className = "item" + i;
		a.title = "Some Link " + i;
		a.innerHTML = "Item " + i;
		li.appendChild(a);

		ul.appendChild(li);
	}

	var ele = document.getElementById("spriteimages");
	if (ele) {
		ele.innerHTML = "";

		ele.appendChild(ul);
	}
}

var timerRunning = true;
//var url = "http://www.page.not.found.com";
var url = "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=BlackBerryDev";
url = "http://devblog.blackberry.com";
var xhr;


function handleResponse() {
	if (xhr.readyState === 4) {
		if (xhr.status === 200 || xhr.status === 0)  {
			timerRunning = false;
			//req.responseText
			document.getElementById("xhrresponse").innerHTML += "XHR complete";
		}
		else {
			timerRunning = false;
			console.error("handleResponse status = " + xhr.status + ": " + xhr.statusText);
			document.getElementById("xhrresponse").innerHTML += "XHR complete";
		}
	}
}

function showTime() {
	console.log("showTime");
	var dt = new Date();
	var sTime = dt.toString();
	var ele = document.getElementById("xhrresponse");
	if (ele && timerRunning) {
		ele.innerHTML += sTime + "<br/>";
		setTimeout(showTime, 100);
	}
}

function syncXHR() {
	document.getElementById("xhrresponse").innerHTML = "Starting syncXHR ...<br/>";
	xhr = new XMLHttpRequest();
	xhr.open('GET', url, false);
	xhr.onreadystatechange = handleResponse;
	xhr.send(null);
	showTime();
}

function asyncXHR() {
	document.getElementById("xhrresponse").innerHTML = "Starting asyncXHR ...<br/>";
	xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.onreadystatechange = handleResponse;
	xhr.send(null);
	showTime();
}

var jqmtype = "";
function handleJQMResponse() {
	if (xhr.readyState === 4) {
		if (xhr.status === 200 || xhr.status === 0)  {
			//req.responseText
			document.getElementById("jqmresponse").innerHTML = jqmtype + " downloaded";
		}
		else {
			console.error("handleResponse status = " + xhr.status + ": " + xhr.statusText);
		}
	}
}

function getjQuery() {
	jqmtype = "jquery-1.9.0.js";
	xhr = new XMLHttpRequest();
	xhr.open('GET', "http://code.jquery.com/jquery-1.9.0.js", true);
	xhr.onreadystatechange = handleJQMResponse;
	xhr.send(null);
}

function getjQueryMin() {
	jqmtype = "jquery-1.9.0.min.js";
	xhr = new XMLHttpRequest();
	xhr.open('GET', "http://code.jquery.com/jquery-1.9.0.min.js", true);
	xhr.onreadystatechange = handleJQMResponse;
	xhr.send(null);

}