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

You've got three options here:

#####Option 1 - The easiest option to build and run yourself out of the box

Why might I choose this option? Well, it's easy! However, you should be aware that you *will* be using the WebWorks project metadata and plugins as they were saved at the time this project was committed to GitHub. If you're using this sample at a later time with a newer version of WebWorks then you should consider ***Option 2***. For reference this project was built with this version of WebWorks.

	```
	> webworks -v
	v2.1.0.12
	```

Clone this repo to your local machine to a location of your choice.

Import the ***webworksbeacon/WebWorksBeaconService*** folder into Momentics - this is the headless service component and is a native application. When importing do **NOT** copy them. You **MUST** ensure that the checkbox entitled **"Copy projects into workspace"** is **NOT** checked.

Build the ***WebWorksBeaconService*** project. This will make the headless service application available to the ***WebWorks*** application for packaging.

Ensure the [BlackBerry 10 WebWorks SDK 2.1](https://developer.blackberry.com/html5/download/sdk) is correctly installed.

Open a command prompt (windows) or terminal (mac) and navigate to the ***webworksbeacon*** folder.

Run the following command to build and deploy the application to a device connected via USB:

	```
	webworks run
	```

#####Option 2 - If you need to use the newest version of WebWorks and plugins

Why might I choose this option? Well, this project was built and committed to GitHub using WebWorks ****2.1.0.13**** and if you're using this project at a later date you might want to make sure that you're using an up to date version of the WebWorks metadata and plugins. Using this method you'll re-create the project using the latest templates and plugins and then simply add the application specific code to your project. 

Clone this repo to your local machine.

Ensure the [BlackBerry 10 WebWorks SDK 2.1](https://developer.blackberry.com/html5/download/sdk) is correctly installed.

Open a command prompt (windows) or terminal (mac) in a fodder of your choosing and run the following command:

	```
	webworks create-headless webworksbeacon
	```

This will create a complete WebWorks headless application in the folder ***webworksBeacon*** using the standard WebWorks Template. 

**Replace** the default ***www*** folder with the ***/www*** folder from **this** project

**Replace** the default ***HeadLess*** folder with the ***/WebWorksBeaconService*** folder  from **this** project

From the command prompt (Windows) or terminal (mac), navigate to the ***webworksbeacon*** folder

	```
	cd webworksbeacon
	```

Run the following commands to configure plugins used by **this application**

	```
	webworks plugin add com.blackberry.invoke
	webworks plugin add com.blackberry.invoked
	```

Run the following command to build and deploy the app to a device connected via USB

	```
	webworks run
	```

#####Option 3 - But I don't want to build it myself!

If you don't want to build this sample application yourself we've included a pre-built and signed BAR file. You can find it in the folder "**installable-bar-files**".

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