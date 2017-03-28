/*
 * Copyright (c) 2014 BlackBerry Limited
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
 
var _self = {},
	_ID = "com.blackberry.community.simplebtsppplugin",
	exec = cordova.require("cordova/exec");

	// These methods are called by your App's JavaScript
	// They make WebWorks function calls to the methods
	// in the index.js of the Extension

	// Simple Synchronous test function to get a string
	
	_self.initialiseBluetooth = function () {
		var result,
			success = function (data, response) {
				result = data;
			},
			fail = function (data, response) {
				console.log("Error: " + data);
			};
		exec(success, fail, _ID, "initialiseBluetooth", null);
		return result;
	};

	_self.terminateBluetooth = function () {
		var result,
			success = function (data, response) {
				result = data;
			},
			fail = function (data, response) {
				console.log("Error: " + data);
			};
		exec(success, fail, _ID, "terminateBluetooth", null);
		return result;
	};

	Object.defineProperty(_self, "bluetoothAddress", {
		get: function () {
			var result,
				success = function (data, response) {
					result = data;
				},
				fail = function (data, response) {
					console.log("Error: " + data);
				};
			exec(success, fail, _ID, "bluetoothAddress", null);
			return result;
		},
		set: function (arg) {
			var result,
				success = function (data, response) {
					result = data;
				},
				fail = function (data, response) {
					console.log("Error: " + data);
				};
			exec(success, fail, _ID, "bluetoothAddress", {"value": arg });
			return result;
		}
	});

	_self.startDeviceScan = function (callback) {
		var sourceIsFunction = false;
		var result,
			success = function (data, response) {
				var json = JSON.parse(data);
				if (json["source"] === "function") {
					result = data;
					sourceIsFunction = true;
				} else if (json["source"] === "thread") {
					callback(data);
					sourceIsFunction = false;
				}
			},
			fail = function (data, response) {
				console.log("Error: " + data);
			};
		exec(success, fail, _ID, "startDeviceScan", null);
		if (sourceIsFunction) {
			return result;
		}
	};

	_self.connectToDevice = function (callback) {
		var sourceIsFunction = false;
		var result,
			success = function (data, response) {
				var json = JSON.parse(data);
				if (json["source"] === "function") {
					result = data;
					sourceIsFunction = true;
				} else if (json["source"] === "thread") {
					callback(data);
					sourceIsFunction = false;
				}
			},
			fail = function (data, response) {
				console.log("Error: " + data);
			};
		exec(success, fail, _ID, "connectToDevice", null);
		if (sourceIsFunction) {
			return result;
		}
	};

	_self.disconnectFromDevice = function () {
		var result,
			success = function (data, response) {
				result = data;
			},
			fail = function (data, response) {
				console.log("Error: " + data);
			};
		exec(success, fail, _ID, "disconnectFromDevice", null);
		return result;
	};

	_self.sendMessage = function (input) {
		var result,
			success = function (data, response) {
				result = data;
			},
			fail = function (data, response) {
				console.log("Error: " + data);
			};
		exec(success, fail, _ID, "sendMessage", { input: input });
		return result;
	};

	_self.listenForConnection = function (callback) {
		var sourceIsFunction = false;
		var result,
			success = function (data, response) {
				var json = JSON.parse(data);
				if (json["source"] === "function") {
					result = data;
					sourceIsFunction = true;
				} else if (json["source"] === "thread") {
					callback(data);
					sourceIsFunction = false;
				}
			},
			fail = function (data, response) {
				console.log("Error: " + data);
			};
		exec(success, fail, _ID, "listenForConnection", null);
		if (sourceIsFunction) {
			return result;
		}
	};

	_self.stopListening = function () {
		var result,
			success = function (data, response) {
				result = data;
			},
			fail = function (data, response) {
				console.log("Error: " + data);
			};
		exec(success, fail, _ID, "stopListening", null);
		return result;
	};

	_self.pluginVersion = function () {
		var result,
			success = function (data, response) {
				result = data;
			},
			fail = function (data, response) {
				console.log("Error: " + data);
			};
		exec(success, fail, _ID, "pluginVersion", null);
		return result;
	};

	Object.defineProperty(_self, "sppServiceUuid", {
		get: function () {
			var result,
				success = function (data, response) {
					result = data;
				},
				fail = function (data, response) {
					console.log("Error: " + data);
				};
			exec(success, fail, _ID, "sppServiceUuid", null);
			return result;
		},
		set: function (arg) {
			var result,
				success = function (data, response) {
					result = data;
				},
				fail = function (data, response) {
					console.log("Error: " + data);
				};
			exec(success, fail, _ID, "sppServiceUuid", {"value": arg });
			return result;
		}
	});

module.exports = _self;
