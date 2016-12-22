(function (global) {
    var queryString = global.location.search,

        queryObject = {},
        regexp = /([^?&]+?)=([^&]+)(?=&)?/g,
        match;

    while (match = regexp.exec(queryString)) {
        var key = match[1],
            value = match[2];

        queryObject[key] = global.decodeURIComponent(value);
    }

    global.queryObject = queryObject;
} (window));