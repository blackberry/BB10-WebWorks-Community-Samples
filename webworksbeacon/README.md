# WebWorksBeacon

This application is effectively a variant of the [WakeMeByBeacon](https://github.com/blackberry/Cascades-Community-Samples/tree/master/wakemebybeacon) application.

Whilst the ***WakeMeByBeacon*** application uses a ***Cascades*** user interface, this application uses a ***WebWorks*** user interface.

Otherwise the functionality is the same. Namely, this application demonstrates how to develop an application for BlackBerry 10 which is capable of running as a ***WebWorks Headless application***, detecting [iBeacons](http://support.apple.com/kb/HT6048)(TM) in the background and notifying the application's WebWorks user interface component of iBeacon events. If the user interface component is not running it will be launched via the Hub.

The sample code for this application is Open Source under 
the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).

###Applies To

* [Apache Cordova for BlackBerry 10](https://github.com/blackberry/cordova-blackberry/tree/master/blackberry10)

###Author(s) 

* [John Murray](https://github.com/jcmurray)

###Release History

* **V1.0.0** - Initial release

###Known Issues

* None

###Dependencies

1. BlackBerry Device Software **10.3 GOLD** and greater for the headless server component.
1. BlackBerry WebWorks **2.1** and greater.

###Required Plugins

The following ***Cordova Plugins*** are required for this sample:

	com.blackberry.invoke
	com.blackberry.invoked

###How to Build WakeMeByBeacon

You've got two options here:

#####Option 1 - Build the project yourself

Using this method you'll re-create the project using the latest templates and plugins and then simply add the application specific code to your project. 

Clone this repo to your local machine.

Ensure the [BlackBerry 10 WebWorks SDK 2.1](https://developer.blackberry.com/html5/download/sdk) is correctly installed. I used this version of WebWorks but you may be using a newer version when you build this project: 

	```
	> webworks -v
	v2.1.0.13
	```

Open a command prompt (windows) or terminal (mac) in a folder of your choosing and run the following command:

	```
	webworks create-headless webworksbeacon
	```

This will create a complete WebWorks headless application in the folder ***webworksbeacon*** using the standard WebWorks Template. 

**Replace** the default ***www*** folder that was created with the ***www*** folder from **this** project

**Replace** the default ***HeadLess*** folder (delete it) with the ***WebWorksBeaconService*** folder  from **this** project.

From the command prompt (Windows) or terminal (mac), navigate to the ***webworksbeacon*** folder

	```
	cd webworksbeacon
	```

You should have two sub-folders in this folder ***WebWorksBeaconService*** and ***www*** in addition to the necessary WebWorks and Cordova files and folders.

Then run the following commands to configure the plugins used by **this application**

	```
	webworks plugin add com.blackberry.invoke
	webworks plugin add com.blackberry.invoked
	```

Import the ***WebWorksBeaconService*** folder into Momentics - this is the headless service component and is a native application. When importing do **NOT** copy them. You **MUST** ensure that the checkbox entitled **"Copy projects into workspace"** is **NOT** checked.

Build the ***WebWorksBeaconService*** project. This will make the headless service application available to the ***WebWorks*** application for packaging by copying the headless service's executable into the folder ***www/assets***. You can check that this has worked by checking that there is a file called ***WebWorksBeaconService*** in that folder after you've built the project.

Run the following command to build and deploy the WebWorks application to a device connected via USB:

	```
	webworks run
	```

#####Option 2 - But I don't want to build it myself!

If you don't want to build this sample application yourself I've included a pre-built and signed BAR file. You can find it in the folder "**installable-bar-files**".

### More Info

* [BlackBerry HTML5 WebWorks](https://bdsc.webapps.blackberry.com/html5/) - Downloads, Getting Started guides, samples, code signing keys.
* [BlackBerry WebWorks Development Guides](https://bdsc.webapps.blackberry.com/html5/documentation)
* [BlackBerry WebWorks Community Forums](http://supportforums.blackberry.com/t5/Web-and-WebWorks-Development/bd-p/browser_dev)
* [BlackBerry Open Source WebWorks Contributions Forums](http://supportforums.blackberry.com/t5/BlackBerry-WebWorks/bd-p/ww_con)
 
**To contribute code to this repository you must be [signed up as an 
official contributor](http://blackberry.github.com/howToContribute.html).**

## Contributing Changes

Please see the [README](https://github.com/blackberry/BB10-WebWorks-Community-Samples/blob/master/README.md) of the BB10-WebWorks-Community-Samples repository for instructions on how to add new Samples or make modifications to existing Samples.

## Bug Reporting and Feature Requests

If you find a bug in a Sample, or have an enhancement request, simply file an [Issue](https://github.com/blackberry/BB10-WebWorks-Community-Samples/issues) for the Sample and send a message (via github messages) to the Sample Author(s) to let them know that you have filed an [Issue](https://github.com/blackberry/BB10-WebWorks-Community-Samples/issues).


## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.