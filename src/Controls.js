function interpolateLine(a,b,interval){
	var deltaX = b.x - a.x;
	var deltaY = b.y - a.y;
	var distance = Math.sqrt(Math.pow(Math.abs(deltaX), 2) + Math.pow(Math.abs(deltaY), 2));
	var fillInCount = Math.floor(distance / interval);
	if(fillInCount === 0){
		return [];
	}
	var points = [];
	var dx = deltaX / fillInCount;
	var dy = deltaY / fillInCount;
	for(var i=1; i<=fillInCount; i++){ //exclude the starting point, include the ending point
		points.push({
			x: Math.floor(a.x + (dx * i)),
			y: Math.floor(a.y + (dy * i))
		});
	}
	return points;
}

var Controls = function(canvas,stage,gameLoop){
	var _obs = {
		'combo':[],
		'slice':[]
	};
	function notifyObs(evnt){
		var args = [].slice.call(arguments,1);
		_obs[evnt].forEach(function(ob){
			ob.apply(null,args);
		});
	}
    function onType(self, char) {
        if (!stage) {
            return;
        }

        if (stage.target == null) {
            // Find a new target
            stage.veggies.forEach(function(veggie) {
                if (veggie.whole && veggie.text[0] == char) {
                    stage.target = veggie;
                }
            });
        }

        if (stage.target != null && stage.target.text[0] == char) {
            stage.target.text = stage.target.text.substring(1);

            if (stage.target.text.length == 0) {
                stage.splitVeggie(stage.target);
				notifyObs('slice', stage.target.type);
                stage.target = null;
            }
        }
    }
	function setupCombos(self){
		SwipeEvents(canvas);
		var swipedVeggies = [];
		var lastSwipePoint;
		$(canvas).on('swipestart swipemove',function(e,pos){
			var swipePoints = [pos];
			if(lastSwipePoint){
				//interpolate the line between the two points, increasing the swipe's resolution.
				//this helps prevent swipe misses, where a swipe goes over a veggie without slicing it.
				swipePoints = swipePoints.concat(interpolateLine(lastSwipePoint, pos, 5));
			}
			var touchedVeggies = stage.getVeggiesAtPoints(swipePoints);
			touchedVeggies.forEach(function(veggie){
				stage.splitVeggie(veggie);
				if(swipedVeggies.indexOf(veggie) === -1){
					swipedVeggies.push(veggie);
				}
				notifyObs('slice',veggie.type);
			});
			stage.swipeTrail.push(pos);
			lastSwipePoint = pos;
		});
		$(canvas).on('swipestop',function(x,y){
			stage.swipeTrail = [];
			if(swipedVeggies.length > 2){
				var center = centerOfVeggies(swipedVeggies);
				notifyObs('combo',swipedVeggies.length,center.x,center.y);
			}
			swipedVeggies = [];
			lastSwipePoint = null;
		});
		function centerOfVeggies(veggies){
			if(veggies.length === 0){
				return {x:0,y:0};
			}
			var sums = {x:0, y:0};
			veggies.forEach(function(veggie){
				sums.x += veggie.pos.x;
				sums.y += veggie.pos.y;
			});
			return {
				x: sums.x / veggies.length,
				y: sums.y / veggies.length
			};
		}
	}
	return {
		init: function(){
			document.addEventListener('keyup',function(e){
				if(e.which == 32){//Space
					if(!!gameLoop){
						gameLoop.playPause();
					}
				}
                onType(this, String.fromCharCode(e.which).toLowerCase())
			});
			if(!!stage){
				//setupCombos(this);
			}
		},
		on: function(evnts,fn){
			evnts.split(' ').forEach(function(evnt){
				_obs[evnt].push(fn);
			});
		}
	};
};
