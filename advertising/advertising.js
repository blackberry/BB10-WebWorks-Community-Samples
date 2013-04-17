/*global blackberry, community */

/*
 * Copyright (c) 2012 Research In Motion Limited.
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

var advertising = {
	/* Set to true if you want advertising.log statements displayed in the console. */
	debugMode: true,

	/* Helper function to toggle framework logging. */
	log: function (message) {
		if (advertising.debugMode) {
			console.log(message);
		}
	},

	/* Populates a supplied divID with an ad based on the Mocean zoneId or, if that fails, default content defined in properties. */
	banner: function (zoneId, divId, properties) {
		var div, request, xhr, key, p;

		/* Retrieve the div and calculate its area; will be used when comparing image areas. */
		div = document.querySelector('#' + divId);
		div.offsetArea = div.offsetWidth * div.offsetHeight;

		/* Initialize our default properties. */
		properties = properties || {};
		properties.defaultURL = properties.defaultURL || '#';
		properties.refreshRate = properties.refreshRate || -1;

		/* Build our request string. */
		request = 'http://ads.mocean.mobi/ad'; /* Mocean. */
		request += '?zone=' + zoneId; /* Our adv. zoneId. */
		request += '&key=5'; /* Indicates a JSON request. */
		request += '&type=2'; /* Return image/banner ads. */
		request += '&libver=1.0.0.10'; /* Library version. */
		request += '&envtype=ww'; /* Environment: WebWorks. */
		request += '&udid=' + blackberry.identity.uuid; /*  Use unique identifier; not the PIN. */

		/* community.deviceInfo will not be available in Ripple, so check and fallback if necessary. */
		try {
			if (community && community.deviceInfo) {
				request += '&countrycode=' + community.deviceInfo.getMCC(); /* Get mobile country code. */
			}
		} catch (err) {
			request += '&countrycode=302'; /* Default mobile country code: Canada. */
		}

		/* Device languages. */
		request += '&isolang=' + blackberry.system.region; /* Device locale language. */
		request += '&language=' + blackberry.system.language; /* Device display language. */

		/* Append additional request parameters. */
		if (properties.params) {
			p = properties.params;
			for (key in p) {
				if (p.hasOwnProperty(key)) {
					request += '&' + key + '=' + p[key];
				}
			}
		}

		/* Currently not working with the SDK, implemented separately once all the files have been returned.
		if (properties.min_size_x) { request += '&min_size_x=' + properties.min_size_x; }
		if (properties.min_size_y) { request += '&min_size_y=' + properties.min_size_y; }
		if (properties.size_x) { request += '&size_x=' + properties.size_x; }
		if (properties.size_y) { request += '&size_y=' + properties.size_y; }
		*/

		/* Display the request for debugging purposes. */
		advertising.log(request);

		/* Create a new AJAX request. */
		xhr = new XMLHttpRequest();
		xhr.open('GET', request, true);
		xhr.onload = function () {
			var json, img, a, n,
				path, offsetArea, width, height, src;

			/* Helper object to keep track of the image we will load. */
			src = {
				path: properties.defaultImage,
				offsetArea: -1
			};

			/* On success... */
			if (this.status === 200) {
				json = this.response;

				/* If the response is empty, something went horribly wrong. */
				if (json === '') {
					advertising.log('Response Error: Empty response.');
					return;
				}

				/* The request returns JSON wrapped in parentheses, remove them if they exist. */
				try {
					if (this.response.indexOf('(') === -1) {
						json = JSON.parse(this.response);
					} else {
						json = JSON.parse(this.response.replace('(', '').replace(')', ''));
					}
				} catch (err) {
					advertising.log('JSON.parse Error: ' + err);
					return;
				}

				/* If the request returned an error, log the error. */
				if (json.error) {
					advertising.log(json);
				} else {
					advertising.log(json);

					/* Loop through all the returned images. */
					for (n = 0; n < json.img.length; ++n) {
						path = json.img[n];

						try {
							/* Retrieve the portion of the filename that contains the dimensions. Example: 48x320 */
							if (path.indexOf('.jpg') !== -1) {
								offsetArea = path.substring(path.indexOf('_') + 1, path.indexOf('.jpg'));
							} else if (path.indexOf('.png') !== -1) {
								offsetArea = path.substring(path.indexOf('_') + 1, path.indexOf('.png'));
							} else {
								throw 'Invalid Image: ' + path;
							}

							/* Calculate image dimensions. offsetArea compares the div and image areas to see how close they are. */
							width = offsetArea.substring(0, offsetArea.indexOf('x'));
							height = offsetArea.substring(offsetArea.indexOf('x') + 1);
							offsetArea = Math.abs(div.offsetArea - (width * height));

							/* Four temporary size checks; can be removed once the web service request respects the dimension values. */
							if (properties.min_size_x && width < properties.min_size_x) { continue; }
							if (properties.min_size_y && height < properties.min_size_y) { continue; }
							if (properties.size_x && width > properties.size_x) { continue; }
							if (properties.size_y && height > properties.size_y) { continue; }

							if (src.offsetArea === -1) {
								/* If we do not yet have a match, this image will be the default. */
								src.offsetArea = offsetArea;
								src.path = path;
							} else {
								/* Compare the offsetAreas to see if the new image fits the div container more closely. */
								if (offsetArea < src.offsetArea) {
									src.offsetArea = offsetArea;
									src.path = path;
								}
							}

							/* Log the valid image. */
							advertising.log(path + ': ' + offsetArea);
						} catch (msg) {
							/* Log errors or discarded images. */
							advertising.log(msg);
						}
					}
				}

				/* If we've found an image match... */
				if (src.offsetArea !== -1) {
					/* Log the chosen image. */
					advertising.log(src.path);

					/* Create a link and ensure the target is set to '_blank' so that URL opens in a child browser. */
					a = document.createElement('a');
					a.target = '_blank';
					a.href = json.url;

					/* Load our selected image and append it to our div. */
					img = document.createElement('img');
					img.onload = function () {
						a.appendChild(img);
						div.innerHTML = '';
						div.appendChild(a);
					};
					img.src = src.path;

					/* If a refreshRate is specified, request a new ad. */
					if (properties.refreshRate !== -1) {
						window.setTimeout(function () {
							advertising.banner(zoneId, divId, properties);
						}, properties.refreshRate);
					}
				} else {
					/* If no valid ad was returned by the Ad Network and we have a default image... */
					if (properties.defaultImage) {
						/* Create a link and ensure the target is set to '_blank' so that URL opens in a child browser. */
						a = document.createElement('a');
						a.target = '_blank';
						a.href = properties.defaultURL;

						/* If we haven't specified a defaultURL, set the onClick to return false to prevent any interaction. */
						if (properties.defaultURL === '#') {
							a.onclick = function () { return false; };
						}

						/* Load the image and append it to our div. */
						img = document.createElement('img');
						img.onload = function () {
							a.appendChild(img);
							div.innerHTML = '';
							div.appendChild(a);
						};
						img.src = src.path;
					} else {
						/* No valid image returned and no default image specified. If we have default HTML to display... */
						if (properties.defaultHTML) {
							/* Show the default HTML. */
							div.innerHTML = properties.defaultHTML;
						}
					}
				}

				/* If we've specified a callback, call it...back. */
				if (properties.callback) {
					properties.callback();
				}
			}
		};

		/* Submit our request. */
		xhr.send();
	}
};
