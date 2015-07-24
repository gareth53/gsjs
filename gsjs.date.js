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

    is_leap_year: function(year) {
        return (new Date(year, 1, 29).getMonth() == 1);
    },

    timedelta:function(dt1, dt2) {
        /*
        accepts two dates as arguments
        returns an object with the follwoing attributes:
        - years
        - months
        - days
        - hours
        - minutes
        - seconds
        - milliseconds
        as well as 'total_' prefixed version
        */
        var future = (dt1 > dt2) ? dt1 : dt2,
            past = (future == dt1) ? dt2 : dt1,
            diff = future.getTime() - past.getTime(),
            units = [
                'years',
                'months',
                'days',
                'hours',
                'minutes',
                'seconds',
                'milliseconds'
            ],
            returnVal = {
                'total_milliseconds': diff,
            },
            date_list = function(date) {
                /*
                convenience function to return all values in a list
                */
                return [date.getYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()]
            },
            round_down = function(f_unit, p_unit, f_subunit, p_subunit) {
                /*
                like math.floor() but for dates
                */
                var diff = f_unit - p_unit;
                if (f_subunit && p_subunit) {
                    if (f_subunit < p_subunit) {
                        diff = diff - 1;
                    }
                }
                return diff;
            },
            future_list = date_list(future),
            past_list = date_list(past),
            loop_limit = units.length;
        
        for (var i=0 ; i<loop_limit ; i++) {
            returnVal[units[i]] = round_down(future_list[i], past_list[i], future_list[i+1], past_list[i+1])
        }

        // add totalValues
        returnVal['total_years'] = returnVal['years'];
        returnVal['total_months'] = returnVal['years'] * 12 + returnVal['months'];
        var ms_worth = {
            'seconds': 1000,
            'minutes': 1000 * 60,
            'hours': 1000 * 60 * 60,
            'days': 1000 * 60 * 60 * 24
        }
        returnVal['total_days'] = Math.floor(diff / ms_worth['days']);
        returnVal['total_hours'] = Math.floor(diff / ms_worth['hours']);
        returnVal['total_minutes'] = Math.floor(diff / ms_worth['minutes']);
        returnVal['total_seconds'] = Math.floor(diff / ms_worth['seconds']);
        return returnVal;
    }
}