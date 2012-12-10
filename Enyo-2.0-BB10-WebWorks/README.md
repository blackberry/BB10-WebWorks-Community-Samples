# Presentation (pdf) and Sample Video are included in this directory, and should be removed before building into an app :)

Enyo 2.0 With BlackBerry 10 WebWorks
====================================

This example shows how to build an application with Enyo 2.0 and include native functionality with BlackBerry WebWorks extensions. This sample will include responding to the battery status and accelerometer, and using the BlackBerry 10 Invocation Framework to choose a music file and play it. This sample requires the [BlackBerry 10 WebWorks SDK](https://developer.blackberry.com/html5/download/).

## Enyo 2.0
Enyo 2.0 is available from the EnyoJS organization on Github (https://github.com/enyojs/enyo). Enyo 2.0 is released under the Apache 2.0 license.

Enyo 2.0 is based on the Enyo 1.0 framework but is designed to be a cross platform framework for all modern mobile and desktop browsers. Since BlackBerry 6, 7.x, PlayBook 1/2.x and BlackBerry 10 all have WebKit Browsers, and allow you to package web content into full applications, it's possible to port Enyo 2.0 applications to BlackBerry relatively quickly. 

## Building for BlackBerry
This application requires Enyo 2.0, and was built with version 2.0.1. This is the approach that was followed, starting with the [Enyo Bootplate](http://enyojs.com/get-enyo/) source code.

1. Clone Bootplate from https://github.com/enyojs/bootplate
2. Create a config.xml file
3. Write Enyo code with WebWorks Extensions
4. Zip your package
5. Run the zip through the WebWorks Packager

### Clone Bootplate
    git clone https://github.com/enyojs/bootplate.git
    cd bootplate
    git submodule update --init

### Creating a config.xml file
The config.xml file tells the packager the details it needs in order to build an application.

The details to set are as follows:
* Name appears on the Homescreen
* Description appears in the Application list
* Author must match Debug Token
* Add an Icon and Loading Screen image (loading screen is optional)
* Can force a single orientation if necessary
* Content points to our debug.html in this case
* Permissions for shared directory on file system

> &lt;rim:permissions&gt;

> 	&lt;rim:permit&gt;access_shared&lt;/rim:permit&gt;

> &lt;/rim:permissions&gt;

* Feature inclusions for WebWorks Extensions

> &lt;feature id="blackberry.app"/&gt;

> ...

See our documentation on creating a config.xml file here: https://bdsc.webapps.blackberry.com/html5/documentation/ww_developing/Working_with_Config_XML_file_1866970_11.html

### Write Enyo code with WebWorks Extensions
In debug.html, I added the webworks-_version_.js file:
> &lt;script src="js/webworks-1.0.2.9.js"&gt;&lt;/script&gt;

With WebWorks, you need to wait for the file to be loaded before using any of the APIs, but you also want the Enyo code to run immediately. So, I separated the WebWorks and Enyo code from each other. The WebWorks code sits in the debug.html file, and makes calls into or gets called by the Enyo App.

ie:

    var a = new App();
    a.renderInto(document.body);
    ...
    window.addEventListener("load", function(e) {
        document.addEventListener("webworksready", function(e) {
        	a.header = blackberry.app.name;
        	blackberry.event.addEventListener("batterystatus", batteryUpdateCallback);
        	window.addEventListener('devicemotion', function(event) {
        		a.updateAccel(
        			event.accelerationIncludingGravity.x, 
        			event.accelerationIncludingGravity.y, 
        			event.accelerationIncludingGravity.z);
        	}, true);
        }, false);
    }, false);

### Zip the package
For simplicity with this sample, I'm not using the Enyo minifier script, just including everything and pointing the config.xml at debug.html instead of index.html

The zip file needs to follow a basic pattern: config.xml must be at the root of the zip, but other resources can be in folders. You just need to reference the content appropriately.

See more documentation on the zip archive here: https://bdsc.webapps.blackberry.com/html5/documentation/ww_developing/Creating_an_archive_file_1873325_11.html

### Package with WebWorks
Depending on which platforms you are targetting, there are different packagers. Each takes the same archive content and creates a different application container in the appropriate SDK. The WebWorks packagers can be downloaded here: https://bdsc.webapps.blackberry.com/html5/download/sdk. Note that this sample is only designed to work with the BlackBerry 10 SDK.

For *BlackBerry 10* devices, the packager creates an native C++ application. Details on packaging an application are here: https://developer.blackberry.com/html5/documentation/package_your_bb10_app_with_ww_sdk_2008473_11.html

The basic WebWorks SDK supports command line packaging, but packaging is also supported through the [Ripple Emulator](https://bdsc.webapps.blackberry.com/html5/documentation/ww_developing/Packaging_your_app_in_Ripple_1904611_11.html), and the [BlackBerry Graphical Aid](http://supportforums.blackberry.com/t5/Testing-and-Deployment/BlackBerry-Tablet-OS-Graphical-Aid/ta-p/1207067)

## Additional Resources on Enyo
The Enyo JS framework has a website with many resources, including links to forums, samples and documentation here: http://enyojs.com/

The main Github site is here: https://github.com/enyojs

## Addiitonal Resources on BlackBerry
The BlackBerry WebWorks microsite is here: https://bdsc.webapps.blackberry.com/html5/

Forums for WebWorks development are here: http://supportforums.blackberry.com/t5/Web-and-WebWorks-Development/bd-p/browser_dev

The main BlackBerry Github site is here: http://github.com/blackberry

## License
Enyo Framework and sample is released under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).

Packaging files for this sample are also released under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).

## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.