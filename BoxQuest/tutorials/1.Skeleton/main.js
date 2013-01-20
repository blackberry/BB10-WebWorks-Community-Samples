/*
- Copyright (c) 2012 Research In Motion Limited.
-
- Licensed under the Apache License, Version 2.0 (the "License");
- you may not use this file except in compliance with the License.
- You may obtain a copy of the License at
-
- http://www.apache.org/licenses/LICENSE-2.0
-
- Unless required by applicable law or agreed to in writing, software
- distributed under the License is distributed on an "AS IS" BASIS,
- WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
- See the License for the specific language governing permissions and
- limitations under the License.
*/

/*global cc, SceneStart */

var ccApplication = cc.Application.extend({
    ctor: function () {
        this._super();
        this.startScene = SceneStart;

        cc.COCOS2D_DEBUG = 0;
        cc.initDebugSetting();

        cc.setup('ccCanvas', window.innerWidth, window.innerHeight);
        document.querySelector('#Cocos2dGameContainer').style.overflow = 'hidden';
        document.querySelector('#Cocos2dGameContainer').style.position = 'fixed';
        document.querySelector('#ccCanvas').style.position = 'fixed';

        cc.Loader.getInstance().onloading = function () {
            cc.LoaderScene.getInstance().draw();
        };

        cc.Loader.getInstance().onload = function () {
            cc.AppController.shareAppController().didFinishLaunchingWithOptions();
        };

        cc.Loader.getInstance().preload([
        ]);
    },

    applicationDidFinishLaunching: function () {
        var director = cc.Director.getInstance();
        director.setDisplayStats(true);
        director.runWithScene(new this.startScene());
        return true;
    }
});

var ccMain = new ccApplication();