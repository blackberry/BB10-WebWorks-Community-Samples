moimgur is a tiny [imgur](http://imgur.com) uploader for BlackBerry 10.
It demonstrates the use of the Invoke framework to handle uploading via
sharing from other apps, and the use of the 
[File API](http://www.w3.org/TR/file-system-api/) to generate previews
for images prior to the upload. See `js/bb.js` for invocation 
and filesystem handling, and `js/app.js` for the rest of the app. 
Backbone.js is used for structuring the app and event handling.

## Author
Dmitry Kichenko @dmkc

## Building
The easiest way to build is through 
[Ripple](https://developer.blackberry.com/html5/documentation/packaging_your_app_in_ripple_1904611_11.html). 
I used the 
[Ant build script](https://github.com/blackberry/BB10-WebWorks-Community-Samples/tree/master/Ant-Build-Script) 
from the WebWorks Community repo. If you end up doing the same, make sure
to set the correct device password in `build.xml`.

## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.