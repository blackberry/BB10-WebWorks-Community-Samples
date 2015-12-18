Facebook PhoneGap Test Application
=======
#Description
This is a simple test application to demonstrate several of the facebook phonegap plugin available here: https://github.com/blackberry/phonegap-facebook-plugin
The output after selecting the buttons in the application after the "--Command name--" string is the output from the called plugin function
#Set-up
Add the Black Berry 10 platform:
```
cordova platform add blackberry10
```

Before using the application, you must add the plugin which can be done with the following command:
```
cordova plugin add https://github.com/blackberry/phonegap-facebook-plugin --variable APP_ID="numberofyourfacebookapp" --variable APP_NAME="nameofyourfacebookapp"
```

