/**
 * Copyright (c) 2013 Matthew Haag
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *
 * You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/
document.addEventListener('webworksready', (function(){

blackberry.io.custom = {};

var fs = null,
setup = function(args){
  var callback = function(){
    blackberry.io.custom.getImage.apply(this,args);
  };
  //this does not seem to like being called on webworksready so Instead we are calling it on first getImage call.
  // un-sandbox file system to access shared folder
  blackberry.io.sandbox = false;
  window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
  window.requestFileSystem(window.TEMPORARY, 1024 * 1024,
    function (_fs) {
      fs = _fs;
      callback();
})};

// in order to access the shared folder,
// config.xml must declare the "access_shared" permission
// reference file by absolute path since file system is un-sandboxed
blackberry.io.custom.getImage = function() {
  if(!fs){
    setup(arguments);
    return;
  }
  var options = basic_options;
  if (arguments.length > 1){
    options.path = arguments[0];
    options.successHandler = arguments[1];
    if(arguments.length > 2)
      options.errorHandler = arguments[2];
  } else {
    //options call
    if (arguments[0]) {
      for (var prop in (arguments[0])) {
        options[prop] = arguments[0][prop];
      }
    }
  }
  if(!options.skipCache){
    if(cache[options.path]){
      delayResponse(cache[options.path],options.successHandler);
      return;
    }
  }
  fs.root.getFile(options.path, {},
      function (fileEntry) {
        fileEntry.file(function (file) {
          var reader = new FileReader();
          // using once here because sometime it seems we get called MANY times by the filereader.
          reader.onload = once(function(e) {
            if(options.memoize)
              cache[options.path] = e.target.result;
            options.successHandler(e.target.result)
          });
          reader.readAsDataURL(file);
        }, options.errorHandler);
       }, options.errorHandler);
};

function original_errorHandler(e) {
    var msg = '';

    switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
        msg = 'QUOTA_EXCEEDED_ERR';
        break;
    case FileError.NOT_FOUND_ERR:
        msg = 'NOT_FOUND_ERR';
        break;
    case FileError.SECURITY_ERR:
         msg = 'SECURITY_ERR';
         break;
    case FileError.INVALID_MODIFICATION_ERR:
         msg = 'INVALID_MODIFICATION_ERR';
         break;
    case FileError.INVALID_STATE_ERR:
         msg = 'INVALID_STATE_ERR';
         break;
    default:
         msg = 'Unknown Error';
        break;
    };

    console.log('Error: ' + msg);
};
/*  So we ALWAYS call async.  
 *
 *
 */
function delayResponse(val,callback){
  setTimeout(function(){
    callback(val);
  },0)
};


var cache = {};

var basic_options = {
  errorHandler : original_errorHandler,
  memoize : true,
  skipCache : false
};

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  // Borrowed from underscore
  once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };
}),false);