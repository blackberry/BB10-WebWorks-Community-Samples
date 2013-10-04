/*
- Copyright (c) 2012 Research In Motion Limited.
-
- Licensed under the Apache License, Version 2.0 (the "License");
- you may not use this file except in compliance with the License.
- You may obtain a copy of the License at
-
- http://www.apache.org/licenses/LICENSE-2.0
-
- Unless required by applicable law or agreed to in writing, software
- distributed under the License is distributed on an "AS IS" BASIS,
- WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
- See the License for the specific language governing permissions and
- limitations under the License.
*/
document.addEventListener('webworksready', function(e) {
	blackberry.event.addEventListener("invoked", 
		function eventListener(data) {
			var callbacks;

			callbacks = {
				// Generic error handling 
				err: function error(e) {
					console.log("Error: ", e);
				},

				// Initialized FS
				fileSystem: function(fs) {
					fs.root.getFile(
						data.uri, 
						null, 
						callbacks.getFile,
                        callbacks.err
                    );
				}, 

				getFile: function(fileEntry) {
					fileEntry.file(
						callbacks.fileEntry,
						callbacks.err
					);
				},

				fileEntry: function (file){
					// Got a File object
					window.App.invoke({
						fileObject: file 
					}); 
				}, 
			};

			// FS sandboxing off to have access to all user data
			blackberry.io.sandbox = false;
			// Chop off 'file:///' 
			data.uri = data.uri.substr(7, data.uri.length)

			window.webkitRequestFileSystem(
				window.PERSISTENT,
				0,
				callbacks.fileSystem,
                callbacks.err
            );
        }
	);
}, false);
