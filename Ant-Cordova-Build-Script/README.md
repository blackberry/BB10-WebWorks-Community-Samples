WebWorks Build Script
=====================

This is an Ant build script for building BlackBerry WebWorks applications for BlackBerry 10 devices using [Apache Cordova/PhoneGap](http://phonegap.com/). With some basic set up, the script can sign and create both test and production builds, deploy to the file system for Ripple, and support optimization with JSLint, JSHint, CSSLint, as well as JS and CSS concatenation and minification.


## Script Setup

The project is designed to work in two parts: 

1. a build script with project specific properties that goes in the project directory.

2. a set of common build tasks and associated tools (including ant) that go in a central location.

## Project specific build.xml

The build.xml file is meant to be placed in the project's main directory and modified with settings specific to the project. These settings should only change based on the project's needs.

When setting up a project to use this build script, add the build.xml file to the project and change these properties in the script:

* Project name: change this from the default to the name you wish to use for the project build files (bar files and ripple directory).

* jsconcat, cssconcat: update these if you want a specific name for your combined and minified files.

* lintfail: defaults to false, but can be set to true if you want to fail the build on errors with JSLint, JSHint, and CSSLint.

* build target: Set to a list of targets you want to build

* anthome: point to the location of ant within the tools directory of the script, one directory below where buildTasks-cordova.xml is found. 

## Common Build Tasks and Tools

In the /tools directory of the repository is a buildTasks-cordova.xml file plus some tools and script files. This folder is meant to be placed in one location and be accessed by the project build scripts. These are common settings and tasks that should change when your build environment changes, not individual projects.

1. To use these tools, create a directory with all the contents somewhere on your system, like __c:\BuildTools__. 

2. If you've got Ant installed already, then that simplifies things. If not, create an __%ANT_HOME%__ environment variable and point it at the __apache-ant-1.8.2__ directory. Then add __%ANT_HOME%/bin__ to your system __PATH__ variable.

3. Open __buildTasks-cordova.xml__ and edit the following properties:

> sign.pw: Code signing password.

> device.bb10.ip: the IP you use when your device is in debug mode. Default is 169.254.0.1

> device.bb10.pw: the password for your device

> device.bb10.pin: the pin of your device

> sim.bb10.ip: the ip of your simulator, found on the bottom of the screen when you run it.

> ndk.dir: update the location where you BlackBerry Native SDK is installed.

> qnxhost.version: get this value from the bbndk-env script files in your NDK directory. Using the lowest value of QNX_HOST_VERSION should be fine.

> qnxtarget.version: get this value from the bbndk-env script files in your NDK directory. Using the lowest value of QNX_TARGET_VERSION should be fine.

> ripple.dir: update the location of your local webserver (or Ripple localhost) so that projects can be pushed out to the webserver.

> ripple.port: change to port of your webserver or Ripple server if necessary. Include the colon. May be left empty to use port 80.

> paramsfile: Set this value to a params.json file if you need to send parameters to downstream tools in the build process, such as the blackberry-signer (ie: proxy setup), or blackberry-nativepackager tools. Leave the value empty to not use a params file.

> cordova.dir: set this to where you've unzipped your cordova-blackberry files. In a later release, this will be used for additional features, but right now it's unused.

> review the other properties, but they shouldn't need changing.

## Build Targets

Build and Deploy together using the following commands:
cordova.device.[test, prod] or cordova.sim.test

To Build Only use the pattern:
cordova.build.[test, prod]
- use test for WebInspector, and debug tokens.
- use prod for signing with a build id and no debugging.

Lint/Hint and Minify targets can be included before the build here
cordova.optimize runs both lint and minify tasks
cordova.lint runs jslint, jshint and csslint
cordova.minify concatenates and minifies the JS and CSS files

Debug Tokens will be created and deployed automatically using the cordova.device.test command.

Deployment commands follow the pattern:
cordova.[device, sim].[test, prod]
- use device for real devices and sim for VMWare based simulators
- test, prod to load the matching build created above

Use the cordova.cleantargets command to keep your project clean of generated targets (these are automatically created by the script).

## Build a Project

Try it out by copying build.xml into a project, editing the script as above and then running __ant build__ in the directory.

This script should work well with IDE's like Eclipse and Sublime Text and others too.

## Dependencies

The script is dependent on several tools:

- [Apache Ant 1.8.2](http://ant.apache.org/) released under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html)

- [Rhino JS](http://www.mozilla.org/rhino/) released under the [MPL/GPL License](https://developer.mozilla.org/en/Rhino_License)

- [YUICompressor](http://developer.yahoo.com/yui/compressor/) released under the [BSD License](http://yuilibrary.com/license/)

- JSLint and JSHint are released under a modified [MIT License](http://www.opensource.org/licenses/MIT) with the addition: "The Software shall be used for Good, not Evil."

- CSSLint is released under the [MIT License](http://www.opensource.org/licenses/MIT)

## Credits

This project was inspired by and based on the work of [Addy Osmani](http://addyosmani.com/blog/client-side-build-process/) and the [HTML5 Boilerplate Ant Script](https://github.com/h5bp/ant-build-script) project. It's really just a tweaking of their work with the addition of BlackBerry WebWorks targets.

## License

The build script aside from the 3rd party tools is covered under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html)

## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.