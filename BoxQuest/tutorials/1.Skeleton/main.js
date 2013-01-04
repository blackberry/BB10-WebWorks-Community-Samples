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