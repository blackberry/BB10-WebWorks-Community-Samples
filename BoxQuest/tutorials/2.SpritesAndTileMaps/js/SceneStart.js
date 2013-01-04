/*global cc */

var LayerStart = cc.Layer.extend({
    background: null,
    hero:       null,
    coins:      null,

	ctor: function () {
		var tmx, n;

		this._super();

		tmx = cc.TMXTiledMap.create('./tmx/0-0.xml');

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

		return true;
	}
});

var SceneStart = cc.Scene.extend({
    onEnter: function () {
        this._super();
        this.addChild(new LayerStart());
    }
});