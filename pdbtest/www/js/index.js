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
    databases: {
        remotedb: null,
        db: null,
        rep: null,
        remotedbName: 'http://192.168.1.142:4984/sync_gateway' // this must be set to point to your gateway
    },

    offline: true,
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
        // create our local db, we need this whether we're online or off
        app.databases.db = new PouchDB('localdb');

        // connect to the remote db 
        app.connectToRemoteDB(function() {
            // app.updateDBStatus(true);
            app.fetchFromServer(app.databases.remotedb, app.databases.db, app.testDBCalls, null);
        }, function() {
            // app.updateDBStatus(false);
            app.testDBCalls(); 
        });
        PouchDB.debug.enable('*'); 
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
    // updates status indicator for remote connection
    updateDBStatus: function(status) {
        // this is just like the received event function
        var parent = document.getElementById('databasesstatus')
        var connected = parent.querySelector('.connected');
        var offline = parent.querySelector('.offline');

        if (status == true) {
            connected.setAttribute('style', 'display:block;');
            offline.setAttribute('style', 'display:none;');
            app.offline = false;
        } else {
            offline.setAttribute('style', 'display:block;');
            connected.setAttribute('style', 'display:none;');
            app.offline = true;
        }
    },
    testDBCalls: function() {
        // first try and load a previously saved configuration document
        var db = app.databases.db;
        db.get('configfile').then(function (result) {
                var color = result.h1Color;
                app.changeHeader(color);
        }).catch(function (err) {
            // find out what the error was
            if (err.status == 404) {
                // this means there is no config file in the local db
                // let's create one
                var config = {
                    _id: 'configfile',
                    h1Color: 'green',
                };

                // put the document on the local db
                db.put(config).then(function (result) {
                    // success, change color of header accordingly
                    app.changeHeader(result.h1Color);
                }).catch(function (err) {
                    console.log(err);
                    app.writeOut("Error: " + err.status + " when trying to put config file on local db");
                })

            } else {
                console.log(err);
                app.writeOut("Error trying to retrieve config document, error code: " + err.status);
            }
        });

        // a few buttons to allow the user to change the color of the title
        var display = document.getElementById('buttons');
        display.innerHTML = "Choose a color for the title from below:</br>";
        app.buttonMaker('Black', display, function() {
            app.changeHeader('black');
        });
        app.buttonMaker('Yellow', display, function() {
            app.changeHeader('yellow');
        });
        app.buttonMaker('Red', display, function() {
            app.changeHeader('red');
        });
        app.buttonMaker('Purple', display, function() {
            app.changeHeader('purple');
        }); 
        app.buttonMaker('Green', display, function() {
            app.changeHeader('green');
        }); 

        // allow the user to save 2 presets
        display = document.getElementById('presets');
        display.innerHTML = "Save the current configuration to one of the presets below:</br>";
        app.buttonMaker('Default', display, function() {
            app.savePreset('configfile');
        });
        app.buttonMaker('Preset 1', display, function() {
            app.savePreset('preset1');
        });
        app.buttonMaker('Preset 2', display, function() {
            app.savePreset('preset2');
        });

        // allow the user the load presets they previously saved
        display = document.getElementById('presetload');
        display.innerHTML = "Load a configuration from a previously saved preset:</br>";
        app.buttonMaker('Load Default', display, function() {
            app.loadPreset('configfile');
        });
        app.buttonMaker('Load Preset 1', display, function() {
            app.loadPreset('preset1');
        });
        app.buttonMaker('Load Preset 2', display, function() {
            app.loadPreset('preset2');
        });

        // button to signal to push to server
        display = document.getElementById('pushtoserver');
        display.innerHTML = "Push all modified documents to remote database:</br>";
        app.buttonMaker('Push to Remote', display, function() {
            app.connectToRemoteDB(function() {
                app.pushAllToServer();
            }, function () {
                alert('Unable to push to remote db');
            });
        });

        // local database function to recreate the db, only for testing purposes and shown for completeness
        display = document.getElementById('localdbfunctions');
        display.innerHTML = "Delete and recreate the local db instance: </br>";
        app.buttonMaker('Recreate Localdb', display, function() {
            app.recreateLocal();
            alert('Recreated local db instance');
        });

        // manually force a fetch of all documents on the remote db to local
        display = document.getElementById('manualpull');
        display.innerHTML = "Force fetch all from remote to local: </br>";
        app.buttonMaker('Manual Pull', display, function() {
            app.connectToRemoteDB(function() {
                app.fetchFromServer(app.databases.remotedb, app.databases.db, null, null)
            }, null);
        });
    },
    fetchFromServer: function(remotedb, localdb, success, fail) {
        remotedb.allDocs({
            include_docs: true,
            attachments: true
        }).then(function (result) {
            // put all pulled documents into the local database
            var docs = result.rows;
            docs.forEach(function(element) {
                localdb.put(element.doc).then(function(response) {
                    alert("Pulled doc with id " + element.doc._id + " and added to local db.");
                }).catch(function (err) {
                    if (err.status == 409) {
                        // we have a conflict here, someone modified the config file (perhaps it was us on another device) while we were offline
                        localdb.get(element.doc._id).then(function (resp) {
                            // to resolve we first fetch the document that is causing the conflict on the local db and remove it
                            localdb.remove(resp._id, resp._rev).then(function (resp) {
                                var newDoc = {
                                    _id: element.doc._id,
                                    h1Color: element.doc.h1Color
                                };
                                localdb.put(newDoc).catch(function (err) {
                                    // must be another error
                                    console.log(err);
                                });
                            }).catch(function (err) {
                                // error again?
                                console.log(err);
                                if (fail) {
                                    fail();
                                }
                            });
                            

                        }).catch(function (err) {
                            // if we've gotten a 409 (conflict), then the following get returns another error (404 not found), we must create the new document
                            if (err.status == 404) {
                                var newDoc = {
                                    _id: element.doc._id,
                                    h1Color: element.doc.h1Color
                                };
                                // put the newly created file on the localdb
                                localdb.put(newDoc).catch(function (err) {
                                    // error again, fail
                                    console.log(err);
                                    if (fail) {
                                        fail();
                                     }
                                })
                            } else {
                                console.log(err);
                                if (fail) {
                                    fail();
                                }
                            }
                        });
                    } else {
                        console.log(err);
                        if (fail) {
                            fail();
                        }   
                    }
                });
            });

            // successfully fetched from server, call success function
            if (success) {
                success();
            }
        }).catch(function (err) {
            app.writeOut("Cannot pull documents from remote db.");
            console.log(err);
                if (fail) {
                    fail();
                }
        });
        
    },
    putDoc: function(db, doc) {
        db.put(doc).then(function (resp) {
            console.log('Put doc with id: ' + resp.id);
            return resp;
        }).catch(function (err) {
            console.log(err);
            return err;
        });
    },
    savePreset: function(presetDocId) {
         // save the preset - first, get the document to see if it exists, if it does not, we create it
         var db = app.databases.db;
        db.get(presetDocId).then(function (resp) {
            // it must exist here
            var h = document.getElementsByTagName('h1');
            var currentColor = h[0].style.color;
            resp.h1Color = currentColor;

            db.put(resp).catch(function (err) {
               console.log(err);
            });
        }).catch(function (err) {
            if (err.status == 404) {
                // the document does not exist
                var h = document.getElementsByTagName('h1');
                var currentColor = h[0].style.color;
                var preset1 = {
                    _id: presetDocId,
                    h1Color: currentColor
                };

                // put it onto the db
                app.databases.db.put(preset1).catch(function (err) {
                    // some error occurred in putting the file onto the db
                    console.log(err);
                });
            }
        });
    },
    loadPreset: function(presetDocId) {
        var db = app.databases.db;
        db.get(presetDocId).then(function (resp) {
            // get the document, then change our text color as usual
            var color = resp.h1Color;
            app.changeHeader(color);
        }).catch(function (err) {
            // an error in fetching the document
            if (err.status == 404) {
                // the document doesn't yet exist
                alert('The document ' + presetDocId + ' does not exist, perhaps you haven\'t saved a preset yet!</br>');
            } else {
                console.log(err);
            }
        });
    },
    pushAllToServer: function() {
        // push all documents on the local db (that were modified) to the remote db
        // first check if we're online
        var remotedb = app.databases.remotedb;
        var localdb = app.databases.db;
        var failed = false;
        localdb.allDocs({
            include_docs: true,
            attachments: true
        }).then(function (resp) {
            var docs = resp.rows;
            docs.forEach(function(element) {
                remotedb.put(element.doc).catch(function (errors) {
                    if (errors.status == 409) {
                        // there is a conflict so let's try and get the remote db's version
                        remotedb.get(element.doc._id).then(function (resp1) {
                            // successfully obtained
                            element.doc._rev = resp1._rev;
                            remotedb.put(element.doc).catch(function (err2) {
                                console.log(err);
                            });
                        }).catch(function (err1) {
                            // there could be a 404 here, we tried to put a file with a revision value onto the server, so if we try to get it and get a 404, it means we must create
                            var newDoc = {
                                _id: element.doc._id,
                                h1Color: element.doc.h1Color
                            };
                            remotedb.put(newDoc).catch(function (err3) {
                                failed = true;
                                console.log(err3);
                            });
                        });
                    } else {
                        failed = true;
                        console.log(errors);
                    }
                });
            });
            if (!failed) {
                alert('Pushed all documents to remote db');
            }
        }).catch(function (err4) {
            // an error retrieving all documents from the local db
            console.log(err4);
        });
    },
    recreateLocal: function() {
        // deletes the local database, this is only necessary for testing applications as we sometimes want to eliminate older versions of documents
        app.databases.db.destroy().then(function (resp) {
            // if successfully deleted, recreate the localdb
            app.databases.db = new PouchDB('localdb');
        }).catch(function (err) {
            console.log(err);
        });
    },
    connectToRemoteDB: function(success, fail) {
        if (app.offline) {
            var r = new PouchDB(app.databases.remotedbName).then(function (resp) {
                // made valid connection
                app.databases.remotedb = resp;
                // call success
                if (success) {
                    app.updateDBStatus(true);
                    success();
                }
            }).catch(function (err) {
                // could not connect
                alert('Unable to connect to remote db.');
                app.offline = true;
                app.updateDBStatus(false);
                console.log(err);
                if (fail) {
                    fail();
                }
            });
        } else {
            // make sure we're still connected
            app.databases.remotedb.info().then(function (resp) {
                if (success) {
                    // still connected, call success 
                    success();
                }
            }).catch(function (err) {
                // not connected anymore or error
                alert('Lost connection to remotedb');
                app.offline = true;
                app.updateDBStatus(false);
                console.log(err);

                // call fail
                if (fail) {
                    fail();
                }
            });
            
        }
    },
    writeOut: function(st) {
        // just a helper function which allows us to write any debug messages to the screen
        var display = document.getElementById('pouchdb-display');
        display.innerHTML += st + '<br/>';
    },
    changeHeader: function(color) {
        // changes color of elements with the 'h1' tag
        var hs = document.getElementsByTagName('h1');
        for (var i = 0; i < hs.length; i++) {
            hs[i].style.color = color;
        }
    },  
    buttonMaker: function(st, context, clickFunction) {
        // creates buttons with display value st and onclick function clickFunction
        // var context = document.getElementById('buttons');
        var b = document.createElement('input');
        b.type = "button";
        b.value = st;
        b.onclick = clickFunction;
        context.appendChild(b);
    }
};

app.initialize();