# Extended Search Integration Sample

This sample shows how include your application the extended search options. An application that implements this feature will appear when the user does a search on their device, and if chosen, the search string is passed into the application on an invocation, so that the user can be shown relevant information directly. 

**Applies To**

* [BlackBerry 10 WebWorks SDK](https://developer.blackberry.com/html5/download/sdk) 

**Author(s)**

* [Tim Windsor](https://github.com/timwindsor) based on the BFB sample by [Chad Tetreault](http://www.twitter.com/chadtatro)

**Dependencies**

1. [bbUI.js](https://github.com/blackberry/bbUI.js) is [licensed](https://github.com/blackberry/bbUI.js/blob/master/LICENSE) under the Apache 2.0 license.

**Icons**

Icons used here are from [Liz Myers](http://www.myersdesign.com) and are [licensed](http://creativecommons.org/licenses/by/3.0/) under the CC-BY-3.0 license.

**To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).**

## How it Works

In the config.xml, you need the invoke features added, and to declare the invoke target for extended search. In this code, the only thing that needs to be changed is the target id, which must be unique across all applications. The recommendation is to use a reverse URI scheme, and end it with ".extendedsearch", to differentiate it from other targets you might declare in this application:

```xml
	<feature id="blackberry.invoked" version="1.0.0" required="true" />
	<feature id="blackberry.invoke" version="1.0.0" required="true" />
	<rim:invoke-target id="com.bb.test.extendedsearch">
		<type>APPLICATION</type>
		<filter>
			<action>bb.action.SEARCH.EXTENDED</action>
			<mime-type>application/vnd.bb.search.criteria</mime-type>
		</filter>
	</rim:invoke-target>
```

The rest is essentially identical to the invokable example. Setup a listener for the __invoked__ event, and check the passed in data object for what the user is searching for:

```javascript

	blackberry.event.addEventListener("invoked", function (invocationInfo){
		console.log("Handler start . . .");
		if (invocationInfo.target) {
			console.log("Invocation target: " + invocationInfo.target);
		}
		if (invocationInfo.type) {
			console.log("Invocation type: " + invocationInfo.type);
		}
		if (invocationInfo.action) {
			console.log("Invocation action: " + invocationInfo.action);
		}
		if (invocationInfo.data) {
			console.log("Invocation data: " + atob(invocationInfo.data));
		}
		if (invocationInfo.action && invocationInfo.action == 'bb.action.SEARCH.EXTENDED') {
			toast('Searching for...' + atob(invocationInfo.data));
			// Send this value to your App's search function: atob(invocationInfo.data)
		}
		console.log("Handler end . . .");
	});

```

## How to Build

1. Clone the repo to your local machine
2. Use Using the Ripple Mobile Emulator and the BlackBerry 10 WebWorks SDK, package the contents of your local BB10-WebWorks-Samples/WindowCovers folder into a BlackBerry application, or if you've set up the [WebWorks Ant Build script](https://github.com/blackberry/BB10-WebWorks-Community-Samples/Ant-Build-Script), run the build using the build.xml file in the sample directory.

## More Info

* [BlackBerry HTML5 WebWorks](https://bdsc.webapps.blackberry.com/html5/) - Downloads, Getting Started guides, samples, code signing keys.
* [BlackBerry WebWorks Development Guides](https://bdsc.webapps.blackberry.com/html5/documentation)
* [BlackBerry WebWorks Community Forums](http://supportforums.blackberry.com/t5/Web-and-WebWorks-Development/bd-p/browser_dev)
* [BlackBerry Open Source WebWorks Contributions Forums](http://supportforums.blackberry.com/t5/BlackBerry-WebWorks/bd-p/ww_con)

## Contributing Changes

Please see the [README](https://github.com/blackberry/BB10-WebWorks-Community-Samples) of the BB10-WebWorks-Community-Samples repository for instructions on how to add new Samples or make modifications to existing Samples.

## Bug Reporting and Feature Requests

If you find a bug in a Sample, or have an enhancement request, simply file an [Issue](https://github.com/blackberry/BB10-WebWorks-Community-Samples/issues) for the Sample.

## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.