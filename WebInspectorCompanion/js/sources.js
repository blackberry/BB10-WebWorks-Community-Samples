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

/*global window, document, console */

/**
 * This sample will run through the numbers from 2 to 50 and check whether each number is divisible by a value between 2 and 9.
 *
 * We use the variable log to keep track of the divisible numbers. For instance, the number 2 is divisible by 2, 3 is divisible by 3, and 4 is divisible by 2.
 * For those three numbers, the sequence will then be:
 * 232
 *
 * For any numbers that we encounter which are not divisible by 2 to 9, we record a # symbol.
 *
 * This can be used to help outline setting break points and stepping through an application.
 */

function seeMeGo() {
	"use strict";
	var log = "", i = 0;

	//50 iterations of the Mod operator
	for (i = 2; i < 50; i++) {

		if (i % 2 === 0) {
			log = log + "2";
		} else if (i % 3 === 0) {
			log = log + "3";
		} else if (i % 4 === 0) {
			log = log + "4";
		} else if (i % 5 === 0) {
			log = log + "5";
		} else if (i % 6 === 0) {
			log = log + "6";
		} else if (i % 7 === 0) {
			log = log + "7";
		} else if (i % 8 === 0) {
			log = log + "8";
		} else if (i % 9 === 0) {
			log = log + "9";
		} else {
			log = log + "#";
		}

	}
	alert(log);
}

var useBlocking = false;
var continueTimer = false;

function showAlarm(dt) {
"use strict";

	try {

		if ((dt.getSeconds() % 10) === 0) {

			var msg = "10s ALARM";
			if (useBlocking) {
				alert(msg);			//blocks all execution until user closes prompt
			} else {
				blackberry.ui.toast.show(msg, { buttonText : "OK" });
			}

		}

	} catch(e) {
		console.error("showAlarm:" + e.getMessage());
	}

}

function startClock() {
"use strict";
	var dt = new Date();
	var sTime = dt.toString();
	document.getElementById("time").innerHTML = sTime;
	showAlarm(dt);
	setTimeout(startClock, 1000);
}

function displayTime() {
"use strict";
	useBlocking = true;
	continueTimer = true;
	startClock();
}

function displayTimeNonBlock() {
"use strict";
	useBlocking = false;
	startClock();
}
