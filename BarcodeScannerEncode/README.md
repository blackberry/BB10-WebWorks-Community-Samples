# BarcodeScanner QRCode Encoding Sample App

Sample Cordova application for testing QRCode encoding using the Blackberry10 BarcodeScanner plugin 

## Requirements 

Needs BarcodeScanner plugin:
```cordova plugin add phonegap-plugin-barcodescanner```

## How to Run

1. Create a new project using cordova create.
2. Copy the www folder in this sample over the default one created by that command.
3. Run __bbndk-env.bat or bbndk-env.sh script if the NDK is not on your PATH.
4. Add the blackberry10 platform to your project by running cordova platform add blackberry10.
5. Then add the BarcodeScanner plugin to the project using cordova plugin add /path/to/project/plugin or 
   cordova plugin add phonegap-plugin-barcodescanner
6. Finally, execute cordova run
