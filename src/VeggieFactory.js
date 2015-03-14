var VeggieFactory = (function(){
	var sprites = {
		onion: {
			x: 0,
			y: 0,
			w: 170,
			h: 220,
	        splits: [
				{
					x: 173,
					y: 4,
					w: 170,
					h: 170
				},
				{
					x: 171,
					y: 174,
					w: 170,
					h: 150
				}
			],
			splitsAlongX:true,
			splitSeparation: 75
		},
		bellpepper: {
			x: 355,
			y: 13,
			w: 155,
			h: 260,
	        splits: [
				{
					x: 535,
					y: 15,
					w: 155,
					h: 230
				},
				{
					x: 535,
					y: 248,
					w: 155,
					h: 174
				}
			],
			splitsAlongX:true,
			splitSeparation: 95
		},
		broccoli: {
			x: 730,
			y: 3,
			w: 183,
			h: 255,
	        splits: [
				{
					x: 924,
					y: 20,
					w: 120,
					h: 260
				},
				{
					x: 1052,
					y: 10,
					w: 100,
					h: 270
				}
			],
			splitsAlongX:false,
			splitSeparation: 55
		},
		squash: {
			x: 1155,
			y: 15,
			w: 85,
			h: 300,
	        splits: [
				{
					x: 1260,
					y: 18,
					w: 84,
					h: 170
				},
				{
					x: 1262,
					y: 180,
					w: 80,
					h: 233
				}
			],
			splitsAlongX:true,
			splitSeparation: 105
		},
		celery: {
			x: 1435,
			y: 30,
			w: 170,
			h: 420,
	        splits: [
				{
					x: 1640,
					y: 40,
					w: 175,
					h: 205
				},
				{
					x: 1670,
					y: 251,
					w: 120,
					h: 200
				}
			],
			splitsAlongX:true,
			splitSeparation: 110
		},
		eggplant: {
			x: 1826,
			y: 1,
			w: 197,
			h: 446,
	        splits: [
				{
					x: 2030,
					y: 12,
					w: 191,
					h: 249
				},
				{
					x: 2030,
					y: 260,
					w: 185,
					h: 240
				}
			],
			splitsAlongX:true,
			splitSeparation: 120
		},
		lettuce: {
			x: 2615,
			y: 100,
			w: 230,
			h: 230,
	        splits: [
				{
					x: 2873,
					y: 23,
					w: 233,
					h: 214
				},
				{
					x: 2873,
					y: 243,
					w: 233,
					h: 214
				}
			],
			splitsAlongX:true,
			splitSeparation: 100
		},
		potato: {
			x: 2270,
			y: 11,
			w: 198,
			h: 210,
	        splits: [
				{
					x: 2261,
					y: 221,
					w: 150,
					h: 206
				},
				{
					x: 2421,
					y: 221,
					w: 155,
					h: 206
				}
			],
			splitsAlongX:false,
			splitSeparation: 75
		},
		avocado: {
			x: 3136,
			y: 4,
			w: 150,
			h: 233,
	        splits: [
				{
					x: 3115,
					y: 238,
					w: 130,
					h: 215
				},
				{
					x: 3248,
					y: 238,
					w: 125,
					h: 207
				}
			],
			splitsAlongX:false,
			splitSeparation: 75
		}
	};
	var spriteKeys = (function(){
		var _keys = [];
		for(var k in sprites){
			_keys.push(k);
		}
		return _keys;
	})();
	function randomSpriteKey(){
		var i = Math.floor(Math.random() * spriteKeys.length);
		return spriteKeys[i];
	}
	return {
		fullSet: function(){
			var veggies = [];
			spriteKeys.forEach(function(k){
				veggies.push(
					new Veggie(k,sprites[k],true,'test'));
			});
			return veggies;
		},
		one: function(key){
			return new Veggie(key,sprites[key],true,'test');
		},
		random: function(){
			var k = randomSpriteKey();
			return new Veggie(k,sprites[k],true,'test');
		},
		randomSet: function(n){
			var veggies = [];
			var n = n || Math.floor(Math.random() * 5) + 1; //no more than 6 at once
			for(var i=0; i<n; i++){
				veggies.push(this.random());
			}
			return veggies;
		},
		randomFlush: function(n){
			var veggies = [];
			var n = n || Math.floor(Math.random() * 5) + 1; //no more than 6 at once
			var k = randomSpriteKey();
			var sprite = sprites[k];
			for(var i=0; i<n; i++){
				veggies.push(new Veggie(k,sprite,true,'test'));
			}
			return veggies;
		},
		flush: function(veggieKey,n){
			var veggies = [];
			var n = n || Math.floor(Math.random() * 5) + 1; //no more than 6 at once
			var sprite = sprites[veggieKey];
			for(var i=0; i<n; i++){
				veggies.push(new Veggie(veggieKey,sprite,true,'test'));
			}
			return veggies;
		},
		fullSplitSet: function(){
			var veggies = [];
			spriteKeys.forEach(function(k){
				sprites[k].splits.forEach(function(sprite){
					veggies.push(
						new Veggie(k,sprite,false,'test'));
				});
			});
			return veggies;
		}
	};
})();
