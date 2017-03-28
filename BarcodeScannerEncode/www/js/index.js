/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
	barcodeScanner: null,
	results: null,
	gotCode: false,
	appContainer: null,

	// Application Constructor
	initialize: function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function() {
		document.addEventListener('deviceready', app.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicity call 'app.receivedEvent(...);'
	onDeviceReady: function() {
		app.barcodeScanner = cordova.plugins.barcodeScanner;
		appContainer = document.getElementById("appContainer")
		document.getElementById('encode_start').addEventListener('click', app.encode, false)
	},
	encode: function() {
		var data = document.getElementById("encoder_data").value;
		var select = document.getElementById("selectEncode");
		var type = select.options[select.selectedIndex].text
		app.barcodeScanner.encode(type, data,app.onEncode, app.onEncodeFail);
	},

	onEncode: function(data){
		console.log("Success!");
		console.log(data);
		var img = document.getElementById("encodeR");
		img.src = data;
	},

	onEncodeFail: function(data){
		console.log(data);
	},
};
