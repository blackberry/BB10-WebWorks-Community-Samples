/*global cc */

var LayerStart = cc.Layer.extend({
	ctor: function () {
		this._super();
		return true;
	}
});

var SceneStart = cc.Scene.extend({
    onEnter: function () {
        this._super();
        this.addChild(new LayerStart());
    }
});