/**
 * Copyright (c) 2012 Research In Motion Limited.
 * Copyright (c) 2013 Matthew Haag
 *
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

/*global window, document, console, alert, blackberry */

/* This file is an adjusted version of the invoke.js which is provided with the file picker example.
   By adjusted I mean "I took out everything not related to an image filepicker and added a callback handler."
 */

var _invoke = {
	/* This function will be called when the user clicks the Invoke button. */
	invoke: function (onComplete) {
		'use strict';
		var options , onCancel, onInvoke, onError;

		/**
		 * Additional options that are available include:
		 * - type					(e.g. FILEPICKER_TYPE_* where * can be PICTURE, DOCUMENT, MUSIC, VIDEO, OTHER)
		 * - viewMode				(e.g. FILEPICKER_VIEWER_MODE_* where * can be LIST, GRID, DEFAULT)
		 * - sortBy					(e.g. FILEPICKER_SORT_BY_* where * can be NAME, DATE, SUFFIX, SIZE)
		 * - sortOrder				(e.g. FILEPICKER_SORT_ORDER_* where * can be ASCENDING, DESCENDING)
		 * - filter					(e.g. ["*.mp3", "*.png*"])
		 * - imageCropEnabled		(true or false)
		 * - defaultSaveFileNames	(when opening a single or multiple items, default names can be provided as an [] for saving.)
		 * - defaultType			(if multiple type values are provided as an [], the default to filter by.)
		 * - allowOverwrite:		(true or false)
		 */
		options = {
			mode: blackberry.invoke.card.FILEPICKER_MODE_PICKER,
			options: blackberry.invoke.card.FILEPICKER_TYPE_PICTURE,
			filter: ["*.jpg","*.png","*.gif","*.jpeg"]
		};

		/* Log the path(s) we pick on completion. */
		if(!onComplete)
			onComplete = function (path) {
				console.log('Picked: ' + path);
			};

		/* Log if we cancel selection. */
		onCancel = function (reason) {
			console.log('Cancelled: ' + reason);
		};

		/* Will be called when the File Picker is invoked. */
		onInvoke = function (error) {
			if (error) {
				console.log('Invoke error: ' + error);
			}
		};

		/* Call the invokeFilePicker function with our defined arguments. */
		blackberry.invoke.card.invokeFilePicker(options, onComplete, onCancel, onInvoke);
	}
};