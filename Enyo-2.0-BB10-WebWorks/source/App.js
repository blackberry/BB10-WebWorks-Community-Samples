enyo.kind({
	name: "App",
	fit: true,
	components:[
	{ tag: 'h3', content: "Enyo BB10" },
	{ tag: 'hr' },
	{ tag: 'p', content: 'Battery Level' },
	{ kind: 'onyx.ProgressBar', name: 'batteryLevel', showStripes: false, progress: 100 },
	{ tag: 'hr' },
	{ tag: 'p', content: 'Accelerometer' },
	{ tag: 'span', content: 'X ' },
	{ kind: 'onyx.Slider', name: 'xAccel', lockBar: false, value: 50 },
	{ tag: 'span', content: 'Y ' },
	{ kind: 'onyx.Slider', name: 'yAccel', lockBar: false, value: 50 },
	{ tag: 'span', content: 'Z ' },
	{ kind: 'onyx.Slider', name: 'zAccel', lockBar: false, value: 50 },
	{ tag: 'hr' },
	{ tag: 'p', content: 'Invocation' },
	{ kind: 'onyx.Button', name: 'invokeButton', content: 'Pick a File', classes: 'onyx-blue', ontap: 'invokeTap' },
	{ tag: 'br' },
	{ tag: 'br' },
	{ tag: 'audio', name: 'player', attributes: { controls: "true", style: "width: 275px" }}
	],
	updateBattery: function(newValue) {
		console.log('Update Battery Level: ' + newValue);
		this.$.batteryLevel.setProgress(newValue);
	},
	updateBatteryCharge: function(newValue) {
		console.log('Update Battery State: ' + newValue);
		if (newValue === true) {
			this.$.batteryLevel.setShowStripes(true);
			this.$.batteryLevel.setAnimateStripes(true);
		} else {
			this.$.batteryLevel.setShowStripes(false);
			this.$.batteryLevel.setAnimateStripes(false);
		}
	},
	updateAccel: function(x, y, z) {
		this.$.xAccel.animateTo(formatAccel(x));
		this.$.yAccel.animateTo(formatAccel(y));
		this.$.zAccel.animateTo(formatAccel(z));
	},
	invokeTap: function(inSender, inEvent) {
		invokeForMusic();
	},
	playFile: function(src) {
		this.$.player.setAttribute('src', src);
		this.$.player.node.play();
	}
});
