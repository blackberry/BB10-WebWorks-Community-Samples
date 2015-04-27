# pdbtest
Pouch DB Sample App for BB10

The purpose of this app is to demonstrate the possible applications of running PouchDB on a BB10 device as a local database, as well as leveraging it to connect to a Couchbase Server through a Sync Gateway. For testing, the app was deployed onto a Blackberry Q10.

Configuring Couchbase Server

Couchbase Server can be found here: http://www.couchbase.com/nosql-databases/couchbase-server

Once you've downloaded and installed Couchbase Server, you can set up a server by following the intial server setup instructions found here: http://docs.couchbase.com/admin/admin/Install/init-setup.html

Remember that if you are hosting the server on your local machine, that you will need to know the IP address of the machine in order to connect to it later. It will be helpful to keep this information with you as you are setting up the Sync Gateway as well as testing the app. 

If you wish to follow the exact setup that I used to create the app, you can create a data bucket called sync_gateway through the Couchbase Console. 

Configuring the Sync Gateway

Couchbase Sync Gateway can be found here: http://www.couchbase.com/nosql-databases/downloads#Couchbase_Mobile

After installing the Sync Gateway, you can follow these instructions to run it and connect to your server: developer.couchbase.com/mobile/develop/guides/sync-gateway/getting-started-with-sync-gateway/connecting-sync-gateway-to-couchbase-server/index.html

If you're following along with my own setup, you can create a configuration file with the following contents which will tell the Sync Gateway to connect to your Couchbase Server.

{
	"log": ["CRUD", "HTTP+"],
	"databases": {
		"sync_gateway": {
			"server": "http://localhost:8091",
			"bucket": "sync_gateway",
			"sync": `
function(doc){
	channel(doc.channels);
}`,
			"users": {
				"GUEST": {"disabled": false, "admin_channels": ["*"]}
			}
		}
	}
}

To run sync gateway with a configuration file you can use the command: sync_gateway <path to your config file>

As you can see, the above configuration allows any user to connect and modify the contents of the database through the usage of a Guest account. This is useful for debugging, but if you'd like to restrict this access, more information can be found here: http://developer.couchbase.com/mobile/develop/guides/sync-gateway/administering-sync-gateway/authorizing-users/index.html

Running the app

To deploy the app to your BB10 device, you can simply create a new app through webworks through the usual "webworks create" command using the CLI. For example: 
	webworks create c:\testapp 
The above would generate the necessary files for a template app in the folder c:\testapp.
More info here: http://developer.blackberry.com/html5/documentation/v2_2/creating_a_webworks_project.html

Once you've created the app using the above command, you can simply copy and replace the config.xml and www directory in the newly created app with the ones from the pdbtest app folder. 

Be sure to replace the value of the remotedbName property of the databases object to point to your sync gateway. It should look something like this: 
	http://192.168.1.100:4984/sync_gateway

 Once this is done you can deploy it to your device using:
	webworks run

Features

The app uses a local pouchdb database to store and hold a default configuration file as well as 2 additional user defined presets. The files simply hold a value which can be used to change the title text color on the main app screen. This is a very simplistic application of the funcitonality of PouchDB and was chosen as to not clutter the app with code not related to using the PouchDB API. 

Upon startup, the app attempts to connect to the remote database to pull any previously saved documents onto the local database. In this particular implementation I have chosen to resolve any conflicts by declaring the remote database's version as the winner. From here the user is free to change the color of the text as well as save/load whatever settings they choose. Any time a change is made, it is first saved to the local database, then if they wish, the user can choose to push their changes to the remote database. 

Bugs/Known Issues

Currently, there is an issue which does not allow pouchDB to use the replicate() function as described here: https://github.com/pouchdb/pouchdb/issues/1666

Because of this, live replication could not be implemented as the multipart response coming from the Sync Gateway cannot be handled by PouchDB. This is the reason for the fetchFromServer() and pushAllToServer() functions in the app, which essentially pulls all the documents from the local (remote) database and manually put's them on the remote (local) database one at a time. 

Future Work/Improvements

A possible optimization would be to upload documents directly to the remote database if a connection is possible. Currently, all changes are made to the local database first, then the user must manually choose to save to the remote database. If the above issue regarding the replicate() function is resolved, this can be done easily by simply calling the sync() function which would then automatically monitor the local database for any changes, and replicate the changes live to the remote database. More information on the sync function can be found here: http://pouchdb.com/api.html#sync