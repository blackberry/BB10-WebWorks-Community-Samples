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

/*global cc, SceneStart */

/* Define our application. */
var ccApplication = cc.Application.extend({
	ctor: function () {
		this._super();
		this.startScene = SceneStart;

		cc.COCOS2D_DEBUG = 0;	/* 0 = OFF, 1 = BASIC, 2 = FULL. */
		cc.initDebugSetting();

		/* Initialize our primary <canvas>. */
		cc.setup('ccCanvas', window.innerWidth, window.innerHeight);
		document.querySelector('#Cocos2dGameContainer').style.overflow = 'hidden';
		document.querySelector('#Cocos2dGameContainer').style.position = 'fixed';
		document.querySelector('#ccCanvas').style.position = 'fixed';

		/* Display the default scene during load. */
		cc.Loader.getInstance().onloading = function () {
			cc.LoaderScene.getInstance().draw();
		};

		/* Initiate application once loading is complete. */
		cc.Loader.getInstance().onload = function () {
			cc.AppController.shareAppController().didFinishLaunchingWithOptions();
		};

		/* Initiate preloading; at minimum, this REQUIRES an [] argument. */
		cc.Loader.getInstance().preload([
			{type: 'tmx', src: './tmx/0-0.xml'},
			{type: 'image', src: './images/0-0.png'},
			{type: 'image', src: './images/tiles.png'}
		]);
	},

	applicationDidFinishLaunching: function () {
		var director = cc.Director.getInstance();
		director.setDisplayStats(true); /* Show FPS information? */
		director.runWithScene(new this.startScene());
		return true;
	}
});

/* Create our new application that we just defined. */
var ccMain = new ccApplication();