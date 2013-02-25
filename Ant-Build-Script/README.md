WebWorks Build Script
=====================

This is an Ant build script for building BlackBerry WebWorks applications for BlackBerry Java smartphones, BlackBerry PlayBook tablets, and BlackBerry 10 devices. With some basic set up, the script can sign and create both test and production builds, deploy to the file system for Ripple, and support optimization with JSLint, JSHint, CSSLint, as well as JS and CSS concatenation and minification.

## Script Setup

The project is designed to work in two parts: 

1. a build script with project specific properties that goes in the project directory.

2. a set of common build tasks and associated tools (including ant) that go in a central location.

## Project specific build.xml

The build.xml file is meant to be placed in the project's main directory and modified with settings specific to the project. These settings should only change based on the project's needs.

When setting up a project to use this build script, add the build.xml file to the project and change these properties in the script:

* Project name: change this from the default to the name you wish to use for the project build files (zip, bar, jad/cod files and ripple directory).

* jsconcat, cssconcat: update these if you want a specific name for your combined and minified files.

* lintfail: defaults to false, but can be set to true if you want to fail the build on errors with JSLint, JSHint, and CSSLint.

* build target: Set to a list of targets you want to build

* For _Windows_ you are then set, but the default path for including the buildTasks.xml file will not work on _MacOS_ or _Linux_ which contain Ant already and put it in a different directory. Change this path to wherever you placed buildTasks.xml.

## Common Build Tasks and Tools

In the /tools directory of the repository is a buildTasks.xml file plus some tools and script files. This folder is meant to be placed in one location and be accessed by the project build scripts. These are common settings and tasks that should change when your build environment changes, not individual projects.

1. To use these tools, create a directory with all the contents somewhere on your system, like __c:\BuildTools__. 

2. If you've got Ant installed already, then that simplifies things. If not, create an __%ANT_HOME%__ environment variable and point it at the __apache-ant-1.8.2__ directory. Then add __%ANT_HOME%/bin__ to your system __PATH__ variable.

3. Open __buildTasks.xml__ and edit the following properties:

> sign.pw: Code signing password.

> file.excludes: add any additional files that shouldn't be zipped, like project files from your editor.

> bbwp.xxx.dir: update the locations of the the SDKs that should be used.

> ripple.dir: update the location of your local webserver (or Ripple localhost) so that projects can be pushed out to the webserver.

> tools.dir: update if you put the tools in a different location than the directory above _%ANT_HOME%_.

> review the other properties, but they shouldn't need changing.

## Build Targets

__build.test__ (build in all SDKs+Ripple with WebInspector, source output, and debug token for Tablet and BB10)

__build.prod__ (build in all SDKs+Ripple with signing and no debugging, and a build id number for Tablet and BB10)

__build.beta__ (build in all SDKs+Ripple with signing _and_ debugging, and a build id number for Tablet and BB10)

__build.ripple__ (deploy to your file system for serving up in Ripple)

Specific builds follow the pattern:
__build.[bbos, tablet, bb10].[test, prod, beta]__

- use __bbos__ for BlackBerry 5 through 7.x smartphones
- __tablet__ for PlayBook 1.x through 2.x
- __bb10__ for BlackBerry 10
- use __test__ for WebInspector, source output, and debug tokens. Will still sign the app for Java Smartphones.
- use __prod__ for regular signing with a build id and no debugging
- use __beta__ for regular signing with a build id and WebInspector turned on.

Lint/Hint and Minify targets can be included before the build:

__build.optimize__ runs both lint and minify tasks

__build.lint__ runs jslint, jshint and csslint

__build.minify__ concatenates and minifies the JS and CSS files

## Deploy Targets

Besides building and linting projects, you can also use this script to deploy to your device, or simulator.

Deployment commands follow the pattern:

__build.deploy.[bb10.[device, sim], tablet, bbos].[test, prod, beta]__
- __bb10__, __tablet__, __bbos__ for each platform as defined above
- only for __bb10__ builds, use __device__ for real devices and __sim__ for VMWare based simulators
- __test__, __prod__, __beta__ to load the matching build created above

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