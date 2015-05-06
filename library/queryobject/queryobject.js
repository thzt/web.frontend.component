(function (global) {
    var originalQueryString = global.location.search,
        decodedQueryString = global.decodeURI(originalQueryString),

        queryObject = {},
        regexp = /([^?&]+?)=([^&]+)(?=&)?/g,
        match;

    while (match = regexp.exec(decodedQueryString)) {
        var key = match[1],
            value = match[2];

        queryObject[key] = value;
    }

    global.queryObject = queryObject;
} (window));