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

/*global importScripts, self, Box2D */

/* Bring in the Box2DWeb functionality. */
importScripts('./Box2D.js');

/* Triggers every update cycle to process the forces acting in our world. */
self.update = function () {
	/* If the hero is not touching any floor, walls, or ceiling, eliminate any vertical (jumping) impulse. */
	if (self.hero.contacts === 0) {
		self.hero.j[1] = 0.0;
	}

	/* Apply the horizontal and vertical impulse forces to our hero. */
	self.hero.ApplyImpulse(
		new Box2D.Common.Math.b2Vec2(self.hero.j[0], self.hero.j[1]),
		self.hero.GetWorldCenter()
	);

	/* If there is no horizontal impulse, set the horizontal velocity to 0; prevents any sliding. */
	if (self.hero.j[0] === 0) {
		self.hero.SetLinearVelocity(
			new Box2D.Common.Math.b2Vec2(
				0.0,
				self.hero.GetLinearVelocity().y
			)
		);
	}

	/* Cap the maximum horizontal velocities between -5.0 and 5.0. */
	self.hero.SetLinearVelocity(
		new Box2D.Common.Math.b2Vec2(
			Math.max(-5.0, Math.min(self.hero.GetLinearVelocity().x, 5.0)),
			self.hero.GetLinearVelocity().y
		)
	);

	/* Process the physics for this tick. */
	self.world.Step(
		0.0167,	/* Frame rate. */
		20,		/* Velocity iterations. */
		20		/* Position iterations. */
	);

	/* Reset any forces. */
	self.world.ClearForces();
	self.hero.j = [0.0, 0.0];

	/* Communicate the new position and rotation of our hero back to the main application thread so that our hero sprite can be updated. */
	self.postMessage({
		hero: {
			x: self.hero.GetPosition().x * self.world.scale,
			y: -self.hero.GetPosition().y * self.world.scale,
			r: self.hero.GetAngle()
		}
	});
};

/* Because we don't want to remove an object while physics calculations are being performed, we maintain a list of them and remove them in bulk. */
self.cleanup = function () {
	var n;

	/* Cycle through and remove all outstanding bodies. */
	for (n = 0; n < self.remove.length; n = n + 1) {
		self.world.DestroyBody(self.remove[n]);
		self.remove[n] = null;
	}
	self.remove = [];
};

self.init = function (objects) {
	var fixtureDef, bodyDef, object, n;

	/* Our world. */
	self.world = new Box2D.Dynamics.b2World(
		new Box2D.Common.Math.b2Vec2(0.0, 24.0),	/* Gravity. */
		true										/* Allow sleep. */
	);
	self.world.scale = 32.0;
	self.remove = [];

	/* Global properties. */
	fixtureDef				= new Box2D.Dynamics.b2FixtureDef();
	fixtureDef.density		= 1.0;
	fixtureDef.friction		= 0.0;
	fixtureDef.restitution	= 0.0;
	bodyDef					= new Box2D.Dynamics.b2BodyDef();

	/* Generate our walls. */
	for (n = 0; n < objects.walls.length; n = n + 1) {
		object					= objects.walls[n];
		bodyDef.type			= Box2D.Dynamics.b2Body.b2_staticBody;
		bodyDef.position.x		= (object.x + object.width / 2.0) / self.world.scale;
		bodyDef.position.y		= -(object.y + object.height / 2.0) / self.world.scale;
		fixtureDef.shape		= new Box2D.Collision.Shapes.b2PolygonShape();
		fixtureDef.shape.SetAsBox(object.width / 2.0 / self.world.scale, object.height / 2.0 / self.world.scale);
		self.world.CreateBody(bodyDef).CreateFixture(fixtureDef).SetUserData({});
	}

	/* Add our coins. */
	for (n = 0; n < objects.coins.length; n = n + 1) {
		object					= objects.coins[n];
		bodyDef.type			= Box2D.Dynamics.b2Body.b2_staticBody;
		bodyDef.position.x		= (object.x + object.width / 2.0) / self.world.scale;
		bodyDef.position.y		= -(object.y + object.height / 2.0) / self.world.scale;
		fixtureDef.shape		= new Box2D.Collision.Shapes.b2PolygonShape();
		fixtureDef.shape.SetAsBox(object.width / 2.0 / self.world.scale, object.height / 2.0 / self.world.scale);
		object = self.world.CreateBody(bodyDef).CreateFixture(fixtureDef).SetUserData({
			tagName: 'coin',
			index: n
		});
	}

	/* Add a box hero. */
	bodyDef.type			= Box2D.Dynamics.b2Body.b2_dynamicBody;
	bodyDef.position.x		= (objects.portals[0].x + objects.portals[0].width / 2.0) / self.world.scale;
	bodyDef.position.y		= -(objects.portals[0].y + objects.portals[0].height / 2.0) / self.world.scale;
	fixtureDef.shape		= new Box2D.Collision.Shapes.b2PolygonShape();
	fixtureDef.shape.SetAsBox(28.0 / 2.0 / self.world.scale, 28.0 / 2.0 / self.world.scale);
	self.hero = self.world.CreateBody(bodyDef);
	self.hero.CreateFixture(fixtureDef).SetUserData({});
	self.hero.j = [];
	self.hero.contacts = 0;

	/* Collision listener for coins, portals, etc. */
	self.listener = new Box2D.Dynamics.b2ContactListener();
	self.listener.BeginContact = function (contact) {
		/* Only our hero moves so it must be a hero collision. */
		self.hero.contacts++;

		/* If there is a collision, find if one of the objects is a coin and, if so, remove that coin. */
		if (contact.m_fixtureB.GetUserData().tagName === 'coin') {
			self.remove.push(contact.m_fixtureB.GetBody());
			self.postMessage({
				msg: 'remove',
				index: contact.m_fixtureB.GetUserData().index
			});
		} else if (contact.m_fixtureA.GetUserData().tagName === 'coin') {
			self.remove.push(contact.m_fixtureA.GetBody());
			self.postMessage({
				msg: 'remove',
				index: contact.m_fixtureA.GetUserData().index
			});
		}

		/* Add portal fixture. */
		/*
		bodyDef.type			= Box2D.Dynamics.b2Body.b2_dynamicBody;
		bodyDef.position.x		= (objects.portals[0].x + objects.portals[0].width / 2.0) / self.world.scale;
		bodyDef.position.y		= -(objects.portals[0].y + objects.portals[0].height / 2.0) / self.world.scale;
		fixtureDef.shape		= new Box2D.Collision.Shapes.b2PolygonShape();
		fixtureDef.shape.SetAsBox(30.0 / 2.0 / self.world.scale, 30.0 / 2.0 / self.world.scale);
		self.hero = self.world.CreateBody(bodyDef);
		self.hero.CreateFixture(fixtureDef);
		*/

		/* If portal fixture exists, check for collision / win. */
	};
	self.listener.EndContact = function () {
		/* Keep track of how many collisions are currently in effect for jumping purposes. */
		self.hero.contacts--;
	};
	self.world.SetContactListener(self.listener);

	setInterval(self.update, 0.0167);	/* Update the physics 60 times per second. */
	setInterval(self.cleanup, 0.0111);  /* Check for object removal 90 times per second. */
};

/* If we receive a message, process and initiate the appropriate action. */
self.addEventListener('message', function (e) {
	if (e.data.msg === 'ApplyImpulse') {
		self.hero.j = e.data.j;
	} else if (e.data.msg === 'init') {
		self.init(e.data);
	}
});