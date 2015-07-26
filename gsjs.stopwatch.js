var gsjs=window.gsjs||{};

gsjs.timer = function(callback, cback_interval) {

	var stopwatch = {

		running: false,
		stops: [], // Date objects when stop() was leagally called
		starts: [],// Date objects when start) was leagally called
		laptimes: [], // milliseconds lap times

		init: function(callback, cback_interval) {
			this.reset();
			clearTimeout(this.cback);
			if (callback) {
				this.cback = setTimeout(function() {
					callback();
				}, (cback_interval || 50))
			}
			return this;
		},


		start_stop: function() {
			if (this.running) {
				this.running = false;
				this.stops.push(new Date());
			}
			else {
				this.running = true;
				this.starts.push(new Date());
			}
			return this.running;
		},


		lap: function() {
			if (this.running) {
				var time = this.get_current_time();
				this.laptimes.push({
					'ms': time,
					'display': this._ms_to_readable_time(time)
				});
				return time;
			}
			return false;
		},

		reset: function() {
			if (this.running) {
				return false;
			}
			else {
				this.running = false;
				this.start =  undefined;
				this.stops =  [];
				this.starts = [];
				this.laptimes = [];
				return true;
			}
		},

		get_current_time: function() {
			var running_total = 0,
				loop_limit = this.starts.length,
				i;
			for (i=0;i<loop_limit;i++) {
				var last_start = this.starts[i];
				var last_stop = (this.stops[i] || new Date());
				running_total = running_total + (last_stop.getTime() - last_start.getTime());
			}
			return running_total;
		},

		get_display: function() {
			return this._ms_to_readable_time(this.get_current_time());
		},

		_ms_to_readable_time: function(ms) {
			/*
			return a string in this format: hh:mm:ss.ms
			examples
				00:00:01.12
				00:01:12.99
				01:43:59.99
			*/
			function add_leading_0s(ms, digits) {
				ms = ms + '';
				while (ms.length <= digits) {
					ms = '0' + ms;
				}
				return ms;
			}
			var ms_in = [
				1000 * 60 * 60, // hrs
				1000 * 60, 		// mins
				1000 			// secs
			];
			var times = [];
			for (var i=0;i<3;i++) {
				var units = Math.floor(ms/ms_in[i]);
				ms = ms - (units * ms_in[i]);
				times.push(add_leading_0s(units, 1));
			}
			return times.join(':') + '.' + add_leading_0s(ms, 2);
		}
	}

	return stopwatch.init(callback, cback_interval);
};