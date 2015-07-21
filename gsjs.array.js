var gsjs = window.gsjs||{};

gsjs.array = {

	randomize: function (array) {
		/*
		funtion that takes an array as an arg
		returns the same array but randomized.
		*/
		return array.sort(function (a, b) {
			return (Math.random() > 0.5) ? -1 : 1;
		});
	},

	combine: function (arr_list, limit) {
      /*
      takes a list of arrays and combines them, rotating thru each list in turn, 
      until we have a new list of the specified limit (or less, but no more)
      */
        var new_array = [],
            arr_list_len = arr_list.length,
            i,
            q,
            limit = (limit || 0);
        if (!Array.isArray(arr_list)) {
            throw "the first argument of combine() must be an array";
        }
        for (i=0; i<limit; i++) {
            for (q=0; q<arr_list_len; q++) {
                if (!Array.isArray(arr_list[q])) {
                    console.log(arr_list);
                    console.log(q);
                    throw "combine() encountered a non-array";
                }
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

    get_random_entry: function (array) {
        /*
        takes an array object as the first argument and returns a random entry from that array
        */
        if (array) {
            return array[Math.floor(array.length * Math.random())];
        } else {
            return undefined;
        }
    },

    pop_at: function(arr, index) {
        /*
        remove an items from a specified index, mutate the array, return the value.
        supports negative indexing
        */
        var lim = arr.length,
            usable_index = (index < 0) ? lim + index - 1 : index,
            value = arr[usable_index],
            i = 0;            
        if (usable_index >= lim) return value;
        for (i;i<lim;i++) {
            var this_val = arr.shift();
            if (i != usable_index) {
                arr.push(this_val);
            }
        }
        return value;
    },
    
    remove_at: function(arr, index) {
        /*
        remove an items from a specified index, returns the changed array and the value
        much cheaper than the pop_at method, but doesn't mutate the original array
        */
        var lim = arr.length,
            usable_index = (index < 0) ? lim + index - 1 : index,
            value = arr[usable_index];
        if ((usable_index > -1) && (usable_index < lim)) {
            arr = arr.slice(0, usable_index).concat(arr.slice(usable_index + 1));
        }
        return [arr, value];
    },
    
    compare_array_values: function(arr1, arr2) {
        var i=0,
            lim =arr1.length;
        if (lim != arr2.length) return false;
        for (i;i<lim;i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    }
};