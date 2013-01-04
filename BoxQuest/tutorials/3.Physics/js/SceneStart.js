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

/*global cc */

var _g = {
    LayerStart: null
};

var LayerStart = cc.Layer.extend({
	physics:    null,
    background: null,
    hero:       null,
    coins:      null,

	ctor: function () {
		var tmx, n;

		this._super();
		_g.LayerStart = this;

		tmx = cc.TMXTiledMap.create('./tmx/0-0.xml');

		this.physics = new Worker('./js/Box2dWebWorker.js');
		this.physics.addEventListener('message', function (e) {
            if (e.data.hero) {
                /* If hero data exists, update our position and rotation. */
                _g.LayerStart.hero.setPosition(new cc.Point(
                    e.data.hero.x,
                    e.data.hero.y
                ));
                _g.LayerStart.hero.setRotation(e.data.hero.r / (Math.PI * 2.0) * 360.0);
            } else if (e.data.msg === 'remove') {
                /* If we need to remove sprites (i.e. hero ran into a coin), update our counter. */
                _g.LayerStart.removeChild(_g.LayerStart.coins.sprites[e.data.index]);
                _g.LayerStart.coins.sprites[e.data.index] = null;
                _g.LayerStart.coins.sprites.count = _g.LayerStart.coins.sprites.count - 1;

                if (_g.LayerStart.coins.sprites.count === 0) {
                    _g.LayerStart.finish.runAction(cc.FadeTo.create(2.0, 255.0));
                }
            }
        });

        this.physics.postMessage({
            msg: 'init',
            walls: tmx.getObjectGroup('walls').getObjects(),
            coins: tmx.getObjectGroup('coins').getObjects(),
            portals: tmx.getObjectGroup('portals').getObjects()
        });

        this.background = cc.Sprite.create('./images/0-0.png');
        this.background.setAnchorPoint(new cc.Point(0.0, 0.0));
        this.background.setPosition(new cc.Point(0.0, 0.0));
        this.addChild(this.background, 0);

        this.hero = cc.Sprite.create('./images/tiles.png', new cc.Rect(32.0, 32.0, 28.0, 28.0));
        this.hero.setAnchorPoint(new cc.Point(0.5, 0.5));
        this.hero.setPosition(new cc.Point(0.0, 0.0));
        this.hero.j = []; /* Will hold the impulse force acting on the hero. */
        this.addChild(this.hero, 2);

		/* Load the coins. */
        this.coins = tmx.getObjectGroup('coins').getObjects();
        this.coins.sprites = [];
        for (n = 0; n < this.coins.length; n = n + 1) {
            this.coins.sprites.push(cc.Sprite.create('./images/tiles.png', new cc.Rect(32.0, 64.0, 32.0, 32.0)));
            this.coins.sprites[n].setPosition(
                new cc.Point(
                    this.coins[n].x + this.coins[n].width / 2.0,
                    this.coins[n].y + this.coins[n].height / 2.0
                )
            );
            this.addChild(this.coins.sprites[n], 3);
        }
        this.coins.sprites.count = this.coins.sprites.length;

        /* Load the finish portal. */
        this.finish = cc.Sprite.create('./images/tiles.png', new cc.Rect(32.0, 0.0, 32.0, 32.0));
        this.finish.setPosition(new cc.Point(
            tmx.getObjectGroup('portals').getObjects()[1].x + tmx.getObjectGroup('portals').getObjects()[1].width / 2.0,
            tmx.getObjectGroup('portals').getObjects()[1].y + tmx.getObjectGroup('portals').getObjects()[1].height / 2.0
        ));
        this.finish.setOpacity(0.0);
        this.addChild(this.finish, 1);

		this.schedule(this.update);
		return true;
	},

    update: function () {
        this.physics.postMessage({
            msg: 'ApplyImpulse',
            j: this.hero.j
        });
        this.hero.j[1] = 0.0; /* Reset vertical impulse to 0 after each frame (otherwise hero will fly away.) */
    }
});

var SceneStart = cc.Scene.extend({
    onEnter: function () {
        this._super();
        this.addChild(new LayerStart());
    }
});