(function (global, queryString) {
    global.queryObject = (function () {
        var queryObject = {},
            regexp = /([^?&]+?)=([^?&]+?)(?=&)?/g,
            match;

        while (match = regexp.exec(queryString)) {
            var key = match[1],
                value = match[2];

            queryObject[key] = value;
        }

        return queryObject;
    } ());
} (window, window.location.search));