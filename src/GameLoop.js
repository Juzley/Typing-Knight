var GameLoop = function(stage){
    var _GAME_TIME = 1 * 60 * 1000;
    var _time = _GAME_TIME;
	var _interval;
	var _obs = {
		start:[],
		stop:[]
	};
	function notify(evnt){
		_obs[evnt].forEach(function(fn){
			fn();
		});
	}
	return {
		isRunning: function(){
			return !!_interval;
		},
		start: function(){
			if(this.isRunning()){
				return;
			}

            if (_time == 0) {
                // Start a new game
                _time = _GAME_TIME;
                stage.veggies.length = 0;
                stage.score = 0;
            }

            self = this;
            _loop = function() {
                stage.update();
                stage.draw(Math.round(_time / 1000));
                _time -= 20;
                if (_time <= 0) {
                    _time = 0;
                    self.stop();
                }
            };
            _loop();
			_interval = setInterval(_loop, 20);
			notify('start');
		},
		stop: function(){
			clearInterval(_interval);
			_interval = null;
			notify('stop');
		},
		playPause: function(){
			if(this.isRunning()){
				this.stop();
			} else {
				this.start();
			}
		},
		on: function(evnt,fn){
			_obs[evnt].push(fn);
		}
	};
};
