var gsjs = window.gsjs||{};

gsjs.date = {
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
        given a number of milliseconds
		returns a timedelta-style object:
    	*/
        var ms_worth = {
            'seconds': 1000,
            'minutes': 1000 * 60,
            'hours': 1000 * 60 * 60,
            'days': 1000 * 60 * 60 * 24,
            'months': 1000 * 60 * 60 * 24 * 30,
            'years': 1000 * 60 * 60 * 24 * 30 * 365
        }
        var sec = 1000,
            min = sec * 60,
            hour = min * 60,
            day = hour * 24,
            month = day * 30,
            year = day * 365;

        var getYears = function(ms) {
            return Math.floor(ms / year);
        },
        getMonths = function(ms) {
            return Math.floor(ms / month);
        },
        getDays = function(ms) {
            return Math.floor(ms / day);
        },
        getHours = function(ms) {
            return Math.floor(ms / hour);
        },
        getMins = function(ms) {
            return Math.floor(ms / min);
        },
        getSecs = function(ms) {
            return Math.floor(ms / sec);
        },
    	returnVal = {
    		years: getYears(ms),
    		total_years: getYears(ms),
    		total_months: getMonths(ms),
    		total_days: getDays(ms),
    		total_hours: getHours(ms),
    		total_minutes: getMins(ms),
    		total_seconds: getSecs(ms),
    		total_milliseconds: ms,
    		toString: function() {
    			return '';
    		}
    	}
        var taken = year * returnVal['years'];

        returnVal['months'] = getMonths(ms - taken);
        taken += month * returnVal['months'];

        returnVal['days'] = getDays(ms - taken);
        taken += day * returnVal['days'];

        returnVal['hours'] = getHours(ms - taken);
        taken += hour * returnVal['hours'];

        returnVal['minutes'] = getMins(ms - taken);
        taken += min * returnVal['minutes'];

        returnVal['seconds'] = getSecs(ms - taken);
        taken += sec * returnVal['seconds'];

        returnVal['milliseconds'] = ms - taken;

        return returnVal;
    }
}