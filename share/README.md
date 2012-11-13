# Using Invocation Framework for Sharing - Sample Application

This application demonstrates how to leverage the Invocation Framework to:

1. Query iF for shareable targets
2. Display a share screen (similar to unbound invocation in Cascades) with a list of selectable targets (uses [bbUI.js](https://github.com/blackberry/bbUI.js))
3. Invoke the target with user-defined data

The installable bar file (signed) is also available in the installable-bar-files folder if you want to see how the sample app functions.

The sample code for this application is Open Source under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).


**Applies To**

* [BlackBerry WebWorks SDK for BB10](https://developer.blackberry.com/html5/)


**Author(s)** 

* Alan Wong ([@alanhhwong](http://twitter.com/alanhhwong))


**Dependencies**

* Uses [bbUI.js](https://github.com/blackberry/bbUI.js), but not mandatory

**Known Issues**

* None

**Tested On**

* BlackBerry 10 Dev Alpha 10.0.9.388

**To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).**

## How to Build

To build the **share** sample application:

1. Click on the **Downloads** tab above.
2. Select **Download as zip** (Windows) or **Download as tar.gz** (Mac) and save the downloaded file to your local machine.
3. Create a new folder on your local machine named **'share'** e.g. **C:\Documents and Settings\User\WebWorks\share** (Windows) or **~/WebWorks/share** (Mac).
4. Open the downloaded ZIP file from step 2 and extract the contents **from inside the zipped 'share' folder** to your local **'share'** folder from step 3.  This ensures that the necessary application assets, such as **config.xml**, are correctly located at the top level of the local **'share'** folder (e.g. **~/WebWorks/share/config.xml**).
5. Copy the webworks-<version>.js client file from **C:\Program Files\Research In Motion\BlackBerry 10 WebWorks SDK <version>\Framework\clientFiles** (Windows) or **~/SDKs/BlackBerry 10 WebWorks SDK <version>/Framework/clientFiles** (Mac) into the top level of the local **'share'** folder (e.g. **~/WebWorks/share/webworks-<version>.js**).
6. Optional: Edit the script reference to the webworks-<version>.js file within any *.html files to ensure the version number is correct.
7. Using the **[Ripple Mobile Emulator](http://developer.blackberry.com/html5/download)** and the **[BlackBerry WebWorks SDK for BB10](http://developer.blackberry.com/html5/download)**, package the contents of your local **'share'** folder into a BlackBerry application.  Enter the project root settings field as the local folder created in step 3, and the archive name settings field as **'share'**.


## More Info

* [BlackBerry HTML5 WebWorks](https://bdsc.webapps.blackberry.com/html5/) - Downloads, Getting Started guides, samples, code signing keys.
* [BlackBerry WebWorks Development Guides](https://bdsc.webapps.blackberry.com/html5/documentation)
* [BlackBerry WebWorks Community Forums](http://supportforums.blackberry.com/t5/Web-and-WebWorks-Development/bd-p/browser_dev)
* [BlackBerry Open Source WebWorks Contributions Forums](http://supportforums.blackberry.com/t5/BlackBerry-WebWorks/bd-p/ww_con)

## Contributing Changes

Please see the [README](https://github.com/blackberry/WebWorks-Samples) of the WebWorks-Samples repository for instructions on how to add new Samples or make modifications to existing Samples.


## Bug Reporting and Feature Requests

If you find a bug in a Sample, or have an enhancement request, simply file an [Issue](https://github.com/blackberry/WebWorks-Samples/issues) for the Sample and send a message (via github messages) to the Sample Author(s) to let them know that you have filed an [Issue](https://github.com/blackberry/WebWorks-Samples/issues).


## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.