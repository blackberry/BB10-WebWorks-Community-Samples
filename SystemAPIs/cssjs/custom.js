function onLoadFunctions() {
blackberry.event.addEventListener("batterystatus", batteryStatus);
blackberry.event.addEventListener("batterylow", batteryLow);
blackberry.event.addEventListener("batterycritical", batteryCritical);
blackberry.event.addEventListener("fontchanged", fontChange);
blackberry.event.addEventListener("languagechanged", langChange);
blackberry.event.addEventListener("regionchanged", regionChange);
document.getElementById('getCurrentTimezone').innerHTML = blackberry.system.getCurrentTimezone()
document.getElementById('fontFamily').innerHTML = blackberry.system.getFontInfo().fontFamily
document.getElementById('fontSize').innerHTML = blackberry.system.getFontInfo().fontSize
document.getElementById('issuretype').innerHTML = blackberry.system.hasCapability('input.keyboard.issuretype')
document.getElementById('touch').innerHTML = blackberry.system.hasCapability('input.touch')
document.getElementById('audio').innerHTML = blackberry.system.hasCapability('media.audio.capture')
document.getElementById('video').innerHTML = blackberry.system.hasCapability('media.video.capture')
document.getElementById('recording').innerHTML = blackberry.system.hasCapability('media.recording')
document.getElementById('gps').innerHTML = blackberry.system.hasCapability('location.gps')
document.getElementById('maps').innerHTML = blackberry.system.hasCapability('location.maps')
document.getElementById('memorycard').innerHTML = blackberry.system.hasCapability('storage.memorycard')
document.getElementById('bluetooth').innerHTML = blackberry.system.hasCapability('network.bluetooth')
document.getElementById('wlan').innerHTML = blackberry.system.hasCapability('network.wlan')
document.getElementById('3gpp').innerHTML = blackberry.system.hasCapability('network.3gpp')
document.getElementById('cdma').innerHTML = blackberry.system.hasCapability('network.cdma')
document.getElementById('iden').innerHTML = blackberry.system.hasCapability('network.iden')
//document.getElementById('hasDataCoverage').innerHTML = blackberry.system.hasDataCoverage()
document.getElementById('hasPermissionSys').innerHTML = blackberry.system.hasPermission(blackberry.system)
//document.getElementById('isMassStorageActive').innerHTML = blackberry.system.isMassStorageActive()
document.getElementById('deviceLockedStatus').innerHTML = blackberry.system.deviceLockedStatus
document.getElementById('hardwareId').innerHTML = blackberry.system.hardwareId
document.getElementById('language').innerHTML = blackberry.system.language
document.getElementById('model').innerHTML = blackberry.system.model
document.getElementById('name').innerHTML = blackberry.system.name
document.getElementById('region').innerHTML = blackberry.system.region
document.getElementById('scriptApiVersion').innerHTML = blackberry.system.scriptApiVersion
document.getElementById('softwareVersion').innerHTML = blackberry.system.softwareVersion
}


function batteryStatus(info) {
	if (info.isPlugged == true) blackberry.ui.toast.show('Charging. ' + info.level +'%');
	else if (info.isPlugged == false) blackberry.ui.toast.show('Unplugged. ' + info.level +'%');
	}
function batteryLow(info) { 
	if (info.isPlugged == false) blackberry.ui.toast.show('Battery Low! ' + info.level + '%');
	else blackberry.ui.toast.show('Charging. ' + info.level + '%');
	}
function batteryCritical(info) { 
	if (info.isPlugged == false) blackberry.ui.toast.show('Battery Critical! ' + info.level +'%');
	else blackberry.ui.toast.show('Charging. ' + info.level +'%');
	}
function fontChange(fontInfo) {blackberry.ui.toast.show('Your font is now ' + fontInfo.fontFamily + ' size ' + fontInfo.fontSize);}
function langChange(newLanguage) {blackberry.ui.toast.show('Your BlackBerry Language is ' + newLanguage);}
function regionChange(newRegion) {blackberry.ui.toast.show('Your BlackBerry Region is ' + newRegion);}
