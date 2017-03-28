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
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
	successHandler: function(obj) {
        console.log(obj);
		app.writeOut("success:" + JSON.stringify(obj));
    },

    errorHandler: function(obj) {
        console.log(obj);
		app.writeOut("error:" + obj);
    },
	testLogin: function(){
		app.writeOut("--- Login with Facebook | Email ----");
        facebookConnectPluginBB10.login(["public_profile", "email"],app.successHandler, app.errorHandler);
			
	},
	testLogout: function(){
		app.writeOut("--- Logging Out ---");
		facebookConnectPluginBB10.logout();
	},
	testGraphAPI: function(){
		app.writeOut("--- Graph API ---");
		facebookConnectPluginBB10.api(               
                "me",
				["user_birthday"],
				app.successHandler,
                app.errorHandler 
            );
	},
	testCheckStatus: function(){
		app.writeOut("--- Getting Login Status ---");
		facebookConnectPluginBB10.getLoginStatus(app.successHandler, app.errorHandler);
	},
	testAppRequest: function() {
		app.writeOut("--- Show Dialog ---");
		facebookConnectPluginBB10.showDialog({
						method: "apprequests",
						message: "Come on man, check out my application."
					},
					app.successHandler,
					app.errorHandler)
	},
	testShare: function(){
		app.writeOut("--- Show Dialog ---");
		facebookConnectPluginBB10.showDialog({
						method: "share",
						message: "https://developers.facebook.com/docs/"
					},
					app.successHandler,
					app.errorHandler)
	},
    writeOut: function(message) {
        var output = document.getElementById('results');
        output.innerHTML = output.innerHTML + message;
        output.appendChild(document.createElement('br'));
        console.log(message);
    }
};

app.initialize();