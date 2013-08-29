/*
 * Copyright 2013 Research In Motion Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function showUA() {
	document.getElementById("useragent").innerHTML = navigator.userAgent;
}

function showGPS() {
	navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
}

function geolocationSuccess(position) {

		var lat, lon, alt, acc, altAcc, head, speed, sb = [];

		lat = position.coords.latitude;
		lon = position.coords.longitude;
		alt = position.coords.altitude;
		acc = position.coords.accuracy;
		altAcc = position.coords.altitudeAccuracy;
		head = position.coords.heading;
		speed = position.coords.speed;

		sb.push("<h3>Current Location:</h3>");
		sb.push("<b>Latitude:</b> " + position.coords.latitude + "<br/>");
		sb.push("<b>Longitude:</b> " + position.coords.longitude + "<br/>");
		sb.push("<b>Altitude:</b> " + position.coords.altitude + "<br/>");
		sb.push("<b>Accuracy:</b> " + position.coords.accuracy + "<br/>");
		sb.push("<b>Altitude Accuracy:</b> " + position.coords.altitudeAccuracy + "<br/>");
		sb.push("<b>Heading:</b> " + position.coords.heading + "<br/>");
		sb.push("<b>Speed:</b> " + position.coords.speed + "<br/>");

		document.getElementById("gps").innerHTML = sb.join("");
}

function geolocationError(posError) {
	if (posError) {
		switch(posError.code) {
			case posError.TIMEOUT:
				console.warn("TIMEOUT: " + posError.message);
				break;
			case posError.PERMISSION_DENIED:
				console.warn("PERMISSION DENIED: " + posError.message);
				break;
			case posError.POSITION_UNAVAILABLE:
				console.warn("POSITION UNAVAILABLE: " + posError.message);
				break;
			default:
				console.warn("UNHANDLED MESSAGE CODE (" + posError.code + "): " + posError.message);
				break;
		}
	}
}
