var gs = window.gs||{};

gs.date = {
	get_ordinal: function(dateObj) {
		var day = dateObj.getDate();
		var suffix = "";
		if ((4 <= day && day <= 20) || (24 <= day && day <= 30)) {
			suffix = "th";
		} else {
			suffix = ["st", "nd", "rd"][day % 10 - 1];
		}
		return suffix;
	},
	
    get_month_string: function(dateObj, length) {
        var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var str = months[dateObj.getMonth()];
        if (length) str.slice(0, length);
        return str;
    },

    timediff: function(date1, date2) {
    	return this.timedelta(date1.getTime() - date2.getTime());
    },

    timedelta: function(ms) {
    	/*
		returns a timedelta-style object:
    	*/
    	return {
    		years: 0,
    		months: 0,
    		days: 0,
    		hours: 0,
    		minutes: 0,
    		seconds: 0,
    		milliseconds: 0,
    		total_years: 0,
    		total_months: 0,
    		total_days: 0,
    		total_hours: 0,
    		total_minutes: 0,
    		total_seconds: 0,
    		total_milliseconds: 0,
    		toString: function() {
    			return '';
    		}
    	}
    }
}