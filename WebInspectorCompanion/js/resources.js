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

/*global window, document, console, mynamespace */


/* Web DB */
var App = {};
function onDBCreate(database) {
	App.db = database;
	database.transaction(
		function (tx) {
			tx.executeSql(
				'CREATE TABLE my_custom_table (uid int unique, name text, created text);',
				[],
				function (tx, res) {
					console.log("table: OK!");
				},
				function (tx, err) {
					console.log("table (" + err.code + "): " + err.message);
				}
			);
		}
	);
}
function initWebDB() {
	App.db = window.openDatabase('MyDatabase', '1.0', 'Description.', 5 * 1024 * 1024, onDBCreate);
}
function displayWebDBCount() {
	App.db.transaction(
		function (tx) {
			tx.executeSql(
				'SELECT uid, name, created FROM my_custom_table;',
				[],
				function (tx, res) {
					console.log("SELECT: OK!");
					var num = res.rows.length;
					var message = "There are " + num + " item(s) saved in Web DB.";
					document.getElementById("webDBCount").innerHTML = message;
				},
				function (tx, err) {
					console.log("SELECT (" + err.code + "): " + err.message);
				}
			);
		}
	);

}
function clearWebDB() {
	App.db.transaction(
		function (tx) {
			tx.executeSql(
				'DELETE FROM my_custom_table;',
				[],
				function (tx, res) {
					console.log("DELETE: OK!");
				},
				function (tx, err) {
					console.log("DELETE (" + err.code + "): " + err.message);
				}
			);
		}
	);

	displayWebDBCount();
}
function addWebDBItem() {
	var key = (new Date()).getTime();
	var val = document.getElementById("txtWebDBValue").value;

	App.db.transaction(
		function (tx) {
			tx.executeSql(
				'INSERT INTO my_custom_table (uid, name, created) VALUES(' + key + ', "' + val + '", "' + new Date().toString() + '");',
				[],
				function (tx, res) {
					console.log("table: OK!");
				},
				function (tx, err) {
					console.log("table (" + err.code + "): " + err.message);
				}
			);
		}
	);
	displayWebDBCount();
}


 /* Local Storage */
function displayLocalStorageCount() {
	var num	= window.localStorage.length;
	var message = "There are " + num + " item(s) saved in Local Storage.";
	document.getElementById("localStorageCount").innerHTML = message;
}
function clearLocalStorage() {
	localStorage.clear();
	displayLocalStorageCount();
}
function addLocalStorageItem() {
	var key = (new Date()).getTime();
	var val = document.getElementById("txtLocalStorageValue").value;
	window.localStorage.setItem(key, val);
	displayLocalStorageCount();
}

/* Cookies */
function displayCookiesCount() {
	var cookies = document.cookie.split(";");
	var num = ((document.cookie === "") ? 0 : cookies.length);
	var message = "There are " + num + " cookie(s).";
	document.getElementById("cookieCount").innerHTML = message;
}
function clearCookies() {
	if (document.cookie !== "") {
		var cookies = document.cookie.split(";");
		for (var i = 0; i < cookies.length; i++) {
			console.log("erasing " + cookies[i].split("=")[0] + " cookies");

			var expiry = new Date();
			expiry.setDate(expiry.getDate() - 1);
			setCookie(cookies[i].split("=")[0], cookies[i].split("=")[1], expiry.toUTCString());
		}
	}
	displayCookiesCount();
}
function setCookie(name, val, expires) {
	document.cookie = name + "=" + val + "; expires=" + expires;
}
function addCookie() {
	var key = (new Date()).getTime();
	var val = document.getElementById("txtCookieValue").value;
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 1);

	setCookie(key, escape(val), expiry.toUTCString());
	displayCookiesCount();
}


function initResources() {
	initWebDB();
	displayWebDBCount();
	displayLocalStorageCount();
	displayCookiesCount();
}
setTimeout(initResources, 200);