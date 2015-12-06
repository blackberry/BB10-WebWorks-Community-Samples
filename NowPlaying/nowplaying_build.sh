#!/bin/bash
rm -rf debug1
cordova create debug1
cd debug1
cordova plugin add https://github.com/blackberry/WebWorks-Community-APIs.git#:/BB10-Cordova/NowPlaying/plugin
rm -rf www/
cp ../config.xml ./
cp -r ../www/ ./www
cordova platform add blackberry10
cordova run
