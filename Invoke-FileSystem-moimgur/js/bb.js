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
