var gsjs = window.gsjs||{};

gsjs.array = {

	randomize: function(array) {
		/*
		funtion that takes an array as an arg
		returns the same array but randomized.
		*/
		return array.sort(function(a, b) {
			return (math.random() > 0.5) ? -1 : 1;
		});
	},

	combine: function(arrays, limit) {
      /*
      takes a list of arrays and combines them, rotating thru each list in turn, 
      until we have a new list of the specified limit (or less, but no more)
      */
        var new_array = new Array();
        if (!Array.isArray(arr_list)) throw "the first argument of combine_arrays() must be an array";
        limit = (limit || 0);
        var arr_list_len = arr_list.length;
        for (var i = 0 ; i < limit; i++) {
            for (var q = 0; q < arr_list_len; q++) {
                if (!Array.isArray(arr_list[q])) throw "combine_arrays() encountered a non-array";
                if (arr_list[q].length > i) {
                    new_array.push(arr_list[q][i]);
                    if (new_array.length >= limit) {
                        return new_array;
                    }
                }
            }
        }
        return new_array;
	},

    get_random_entry: function(array) {
        /*
        takes an array object as the first argument and returns a random entry from that array
        */
        if (array) {
            return array[Math.floor(array.length * Math.random())];
        }
        else {
            return undefined;
        }
    },

    remove_from_array: function(arr, index) {
        /*
        remove an entry from an array by index
        */
        if (index < 0) return arr.slice(0);
        var pt1 = arr.slice(0, index);
        var pt2 = arr.slice(index+1);
        return pt1.concat(pt2);        
    },

    delete_from_array: function(arr, value) {
        /*
        remove an entry from an array by value
        */
        var returnArr = [],
            entry;
        for (var i=0, lim=arr.length ; i<lim ; i++) {
            entry = arr[i];
            if (entry !== value) {
                returnArr.push(entry);
            }
        }
        return returnArr;
    }
};