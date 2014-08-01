/*
 * Copyright (c) 2013-2014 BlackBerry Limited.
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

 var wsHandler = {
    // WebSocket Initialiser
    //
    initialise: function() {
        this.ws = new WebSocket("ws://localhost:14354");
        this.ws.onopen = function(event) { wsHandler.onOpen(event); };
        this.ws.onclose = function(event) { wsHandler.onClose(event); };
        this.ws.onmessage = function(event) { wsHandler.onMessage(event); };
    },
    // WebSocket Open Event Handler
    //
    onOpen: function(event) {
        console.log("XXXX WebSocket Opened");
        
        this.logMessage("Connected to headless service");

        document.getElementById("btnStartService").disabled=true;
        document.getElementById("btnStopService").disabled=false;
        document.getElementById("btnEnableScanInvokeRequest").disabled=false;
        document.getElementById("btnDisableScanInvokeRequest").disabled=true;

        if (this.ws.readyState === 1)  {
            this.ws.send(JSON.stringify({"TYPE" : "PING", "DATA" : "Hello from WebWorks!"}));
        }
    },
    // WebSocket Close Event Handler
    //
    onClose: function(event) {
        console.log("XXXX WebSocket Closed (" + event.code + ")");
        this.logMessage("Not connected to headless service");

        document.getElementById("btnStartService").disabled=false;
        document.getElementById("btnStopService").disabled=true;
        document.getElementById("btnEnableScanInvokeRequest").disabled=true;
        document.getElementById("btnDisableScanInvokeRequest").disabled=true;
    },
    // WebSocket Message Event Handler
    //
    onMessage: function(event) {
        this.parseMessage(event.data);
    },
    // Log to screen
    //
    logMessage: function(message) {
        var logBlock = document.getElementById("logBlock");
        var logContent = document.getElementById("content").innerHTML;
        logContent += "<br/>" + message;
        document.getElementById("content").innerHTML = logContent;
        logBlock.scrollTop = logBlock.scrollHeight;
    },
    parseMessage: function(message) {
        var msg = JSON.parse(message);

        switch(msg.TYPE) {
            case "STATUS":
                this.logMessage("Status from Headless Service");
                this.logMessage("&nbsp;TimeStamp:" + msg.TIME_STAMP);
                this.logMessage("&nbsp;Bluetooth Initialised:" + msg.BT_INIT);
                this.logMessage("&nbsp;Bluetooth Radio On:" + msg.BT_RADIO_ON);
                this.logMessage("&nbsp;Scanning:" + msg.SCANNING);
                this.logMessage("&nbsp;Server up:" + msg.SERVER_UP);

                if (msg.SERVER_UP === true) {
                    document.getElementById("btnStartService").disabled=true;
                    document.getElementById("btnStopService").disabled=false;
                } else {
                    document.getElementById("btnStartService").disabled=false;
                    document.getElementById("btnStopService").disabled=true;
                }

                if (msg.SCANNING === true) {
                    document.getElementById("btnStartService").disabled=true;
                    document.getElementById("btnStopService").disabled=true;
                    document.getElementById("btnEnableScanInvokeRequest").disabled=true;
                    document.getElementById("btnDisableScanInvokeRequest").disabled=false;
                } else {
                    document.getElementById("btnStartService").disabled=true;
                    document.getElementById("btnStopService").disabled=false;
                    document.getElementById("btnEnableScanInvokeRequest").disabled=false;
                    document.getElementById("btnDisableScanInvokeRequest").disabled=true;
                }

                break;

            case "BEACON-ENTER-RANGE":
                this.logMessage("Beacon Entered Range");
                this.logMessage("&nbsp;TimeStamp:" + msg.TIME);
                this.logMessage("&nbsp;UUID:" + msg.UUID);
                this.logMessage("&nbsp;Major:" + msg.MAJOR);
                this.logMessage("&nbsp;Minor:" + msg.MINOR);
                this.logMessage("&nbsp;Path Loss:" + msg.LOSS);
                break;

            case "BEACON-EXIT-RANGE":
                this.logMessage("Beacon Exited Range");
                this.logMessage("&nbsp;TimeStamp:" + msg.TIME);
                this.logMessage("&nbsp;UUID:" + msg.UUID);
                this.logMessage("&nbsp;Major:" + msg.MAJOR);
                this.logMessage("&nbsp;Minor:" + msg.MINOR);
                this.logMessage("&nbsp;Path Loss:" + msg.LOSS);
                break;
        }
    }
 };

 var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        document.getElementById("btnStartService").setAttribute("onclick", "app.startService()");
        document.getElementById("btnStopService").setAttribute("onclick", "app.stopService()");
        document.getElementById("btnEnableScanInvokeRequest").setAttribute("onclick", "app.enableScanInvokeRequest()");
        document.getElementById("btnDisableScanInvokeRequest").setAttribute("onclick", "app.disableScanInvokeRequest()");
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
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        blackberry.event.addEventListener('invoked', app.onInvoked);
        app.startService();
    },
    onInvoked: function(invokeRequest) {
        console.log("XXXX Invoked - Action: " + invokeRequest.action);
        if (invokeRequest.action && (invokeRequest.action == "bb.action.START")) {
            if(invokeRequest.data) {
                console.log("XXXX Invoke Data: " + invokeRequest.data);
                console.log("XXXX Invoke atob(Data): " + atob(invokeRequest.data));
                var invokeData = atob(invokeRequest.data);
                var msg = JSON.parse(invokeData);
                wsHandler.parseMessage(invokeData);
            }
        }
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('XXXX Received Event: ' + id);
    },
    onSuccess: function() {
        console.log("XXXX Invoked app successfully");
    },
    onError: function() {
        console.log("XXXX Error invoking app");
    },
    startService: function() {
        blackberry.invoke.invoke({
            target: "com.example.WebWorksBeaconService",
            action: "bb.action.START"
        }, function() {
            console.log("XXXX Starting Headless Service");
            wsHandler.logMessage("Starting Headless Service ...");  
            wsHandler.logMessage("... please wait a few seconds");
            document.getElementById("btnStartService").disabled=true;
            setTimeout(function() { wsHandler.initialise();
                document.getElementById("btnStartService").disabled=false;
             }, 3000);
        }, function() {
            console.log("XXXX Error starting Headless Service");      
            wsHandler.logMessage("Error starting Headless Service");  
        })
    },
    stopService: function() {
        blackberry.invoke.invoke({
            target: "com.example.WebWorksBeaconService",
            action: "com.example.WebWorksBeaconService.STOPSERVICE"
        }, function() {
            console.log("XXXX Stopping Headless Service");      
        }, function() {
            console.log("XXXX Error stopping Headless Service");      
        })
    },
    enableScanInvokeRequest: function() {
        app.addScanRequest("00:00:00:00:00:00");
        blackberry.invoke.invoke({
            target: "com.example.WebWorksBeaconService",
            action: "com.example.WebWorksBeaconService.ENABLESCANINVOKE"
        }, function() {
            console.log("XXXX Enabling scanning");      
        }, function() {
            console.log("XXXX Error enabling scanning");      
        });
    },
    disableScanInvokeRequest: function() {
        app.removeScanRequest("00:00:00:00:00:00");
        blackberry.invoke.invoke({
            target: "com.example.WebWorksBeaconService",
            action: "com.example.WebWorksBeaconService.DISABLESCANINVOKE"
        }, function() {
            console.log("XXXX Disabling scanning");      
        }, function() {
            console.log("XXXX Error disabling Scanning");      
        })
    },
    addScanRequest: function(address) {
        var jsonAddress = '{"address" : "' + address + '"}';
        blackberry.invoke.invoke({
            target: "com.example.WebWorksBeaconService",
            action: "com.example.WebWorksBeaconService.ADDSCAN",
            data: jsonAddress
        }, function() {
            console.log("XXXX Adding scan address: " + address);      
        }, function() {
            console.log("XXXX Error adding scan address: " + address);      
        })
    },
    removeScanRequest: function(address) {
        var jsonAddress = '{"address" : "' + address + '"}';
        blackberry.invoke.invoke({
            target: "com.example.WebWorksBeaconService",
            action: "com.example.WebWorksBeaconService.REMOVESCAN",
            data: jsonAddress
        }, function() {
            console.log("XXXX Removing scan address: " + address);
        }, function() {
            console.log("XXXX Error removing scan address: " + address);
        })
    }
};

