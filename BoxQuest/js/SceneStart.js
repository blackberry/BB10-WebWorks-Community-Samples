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

/*global cc, Worker, Freewill */

/* Global namespace for communicating with the Web Worker. */
var _g = {
	LayerStart: null
};

var LayerStart = cc.Layer.extend({
	physics:	null,	/* Our physics Web Worker. */
	background:	null,	/* A cc.Sprite with our background image. */
	hero:		null,	/* A cc.Sprite with our hero image and properties. */
	coins:		null,	/* An [] of coin objects retrieved from the TMX file. */

	ctor: function () {
		var tmx, n;

		/* Always call _super() first. */
		this._super();
		_g.LayerStart = this;

		/**
		 * Uncomment the following two lines of code in order to enable Keyboard controls instead of Freewill.js.
		 * Also see Lines 163-189.
		 */
		//this.setKeyboardEnabled(true);
		//document.querySelector('#freewill').style.visibility = 'hidden';

		/* Load our TMX-as-XML world. */
		tmx = cc.TMXTiledMap.create('./tmx/0-0.xml');

		/* Get our physics worker going. */
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
			} else {
				/* If nothing has happened yet, we should default to logging a console message. Meant for debugging the Web Worker. */
				console.log(e.data.msg);
			}
		});

		/* Initialize our Web Worker. */
		this.physics.postMessage({
			msg: 'init',
			walls: tmx.getObjectGroup('walls').getObjects(),
			coins: tmx.getObjectGroup('coins').getObjects(),
			portals: tmx.getObjectGroup('portals').getObjects()
		});

		/* Load the scenery. */
		this.background = cc.Sprite.create('./images/0-0.png');
		this.background.setAnchorPoint(new cc.Point(0.0, 0.0));
		this.background.setPosition(new cc.Point(0.0, 0.0));
		this.addChild(this.background, 0);

		/* Load the hero. */
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

		/* Load freewill. */
		this.freewill = new Freewill({
			container: document.querySelector('#freewill')
		});

		/* Add a Joystick to control movement. */
		this.freewill.move = this.freewill.addJoystick({
			imageBase: './images/freewill/buttonblue.png',						/* Irrelevant since we never see the Joystick. */
			imagePad: './images/freewill/buttonblue.png',						/* Irrelevant since we never see the Joystick. */
			fixed: false,														/* Joystick will move. */
			pos: [0.0, 0.0],													/* Irrelevant since we never see the Joystick. */
			trigger: [0.0, 0.0, window.innerWidth / 2.0, window.innerHeight],	/* The touch area that triggers this Joystick will be the left half of the screen. */
			opacLow: 0.0,														/* Lowest opacity is 0; invisible. */
			opacHigh: 0.0														/* Highest opacity is 0; invisible. */
		});

		/* If there is movement, update our horizontal impulse force to that of the Joystick's horizontal position. */
		this.freewill.move.onTouchMove = function () {
			_g.LayerStart.hero.j[0] = this.velocity[0];
		};

		/* When we release the Joystick, ensure the impulse force is 0. */
		this.freewill.move.onTouchEnd = function () {
			_g.LayerStart.hero.j[0] = 0.0;
		};

		/* Add a Button to control jumping. */
		this.freewill.jump = this.freewill.addButton({
			image: './images/freewill/buttonblue.png',												/* Irrelevant since we never see the Button. */
			fixed: true,																			/* Button won't move. */
			pos: [0.0, 0.0],																		/* Irrelevant since we never see the Button. */
			trigger: [window.innerWidth / 2.0, 0.0, window.innerWidth / 2.0, window.innerHeight],	/* The touch area that triggers the button will be the right half of the screen. */
			opacLow: 0.0,																			/* Lowest opacity is 0; invisible. */
			opacHigh: 0.0																			/* Highest opacity is 0; invisible. */
		});

		/* When the user touches the screen, we initiate a jump (vertical impulse.) */
		this.freewill.jump.onTouchStart = function () {
			_g.LayerStart.hero.j[1] = -9.0;
		};

		/* Every frame, we will update the Web Worker with the current forces acting on our hero based on user input. */
		this.schedule(this.update);
		return true;
	},

	/**
	 * Uncomment the onKeyDown and onKeyUp functions to enable Keyboard control of the hero.
	 * Also see Lines 37-42.
	 */

	//onKeyDown: function (e) {
	//	if (e === 38) {
	//		if (_g.LayerStart.hero.jumping === false) {
	//			_g.LayerStart.hero.jumping = true;
	//			_g.LayerStart.hero.j[1] = -9.0;
	//		}
	//	} else if (e === 37) {
	//		_g.LayerStart.hero.j[0] = -40.0;
	//	} else if (e === 39) {
	//		_g.LayerStart.hero.j[0] = 40.0;
	//	}
	//},

	//onKeyUp: function (e) {
	//	if (e === 38) {
	//		_g.LayerStart.hero.jumping = false;
	//	} else if (e === 37) {
	//		_g.LayerStart.hero.j[0] = 0.0;
	//	} else if (e === 39) {
	//		_g.LayerStart.hero.j[0] = 0.0;
	//	}
	//},

	/* Send the impulse forces based on the current actions being taken. */
	update: function () {
		this.physics.postMessage({
			msg: 'ApplyImpulse',
			j: this.hero.j
		});
		this.hero.j[1] = 0.0; /* Reset vertical impulse to 0 after each frame (otherwise hero will fly away.) */
	}
});

/* Our main Scene object that holds our Layer. */
var SceneStart = cc.Scene.extend({
    onEnter: function () {
        this._super();
        this.addChild(new LayerStart());
    }
});