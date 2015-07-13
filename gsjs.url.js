var gsjs = window.gsjs||{};

gsjs.url = {

    getQueryStringVal: function(url, keyname) {
        /*
        key - should be a string (altho numbers work fine)
        returns either an object or a string.
        returns an object repesenting all QueryStrign values if called without an argument
        returns either a string or undefined if called with an arg
        Given:
            window.location.toString() returns "http://example.com?test=foo&try=bar#anchor"
        Usage:
            window.getQueryStringVal()
                returns: { 'test': 'foo', 'try': 'bar' };
            window.getQueryStringVal('test')
                returns 'foo'
            window.getQueryStringVal('another_test')
                returns undefined
        */
        var s = window.location.search,
            qs_vals = {},
            bits = [],
            len = 0,
            getQSFromString = function(url) {
                var st = url.indexOf('?'),
                    end = url.indexOf('#');
                if (st > -1) {
                    end = (end > -1) ? end : url.length;
                    return url.substring(st, end);
                }
                return "";
            };
        if (url) {
            s = getQSFromString(url);
        }
        s = s.replace(/^\?/, '');
        if (s === "") {
            return (keyname) ? undefined : qs_vals;
        }
        s = s.replace('&amp;', '&');
        bits = s.split('&');
        len = bits.length;
        for (var i=0;i<len;i++) {
            var key_val = bits[i].split('='),
                name = key_val[0],
                val = key_val[1];
            qs_vals[name] = (val) ? decodeURIComponent(val) : undefined;
        }
        if (keyname) {
            return (qs_vals[keyname]) ? qs_vals[keyname] : undefined;
        }
        return qs_vals;
    },

    updateQueryStringVal: function(url, key, value) {
        var keys = this.getQueryStringVal(url);
        keys[key] = value;
        return url + this.jsonToQueryString(keys);
    },

    jsonToQueryString: function(json) {
        var qs = '',
            separator = '',
            val;
        for (var i in json) {
            val = json[i];
            if (val === '') continue;
            qs += separator + i + '=' + encodeURIComponent(val);
            separator = '&';
        }
        return (qs) ? '?' + qs : qs;
    }
}