(function ($) {
    $.sendAjax = function () {
        var url = arguments[0].url,
            data = arguments[0].data,
            type = arguments[0].type || 'post',

            success = arguments[0].success,
            complete = arguments[0].complete,
            
            serialize=arguments[0].serialize,

            isPostRequest = type.toLowerCase() === 'post';

        isPostRequest
            ? sendPostRequest(url, data, success, complete,serialize)
            : sendGetRequest(url, data, success, complete,serialize);
    };

    function sendPostRequest(url, data, success, complete,serialize) {
        $.ajax({
            cache: false,
            type: 'post',
            dataType: 'json',

            url: url,
            data: serialize
                ?serialize(data)
                
                //jQuery will use $.param(data) to serialize data
                :data,

            success: success,
            complete: complete,
            error: function (xhr) {
                var status = xhr.status,
                    responseText = xhr.responseText;

                //chrome bug
                //when continuous refresh the browse or network break off, this will happen.
                if (status === 0 && responseText === '') {
                    return;
                }

                //when sever return null, it should be successful.
                if (responseText === '') {
                    success(null);
                    return;
                }

                var isServerDefinedError = tryHandleServerDefinedError(responseText);
                if (isServerDefinedError) {
                    return;
                }

                window.console && window.console.error(responseText);
            }
        });
    }

    function sendGetRequest(url, data, success, complete,serialize) {
        $.ajax({
            cache: false,
            type: 'get',
            dataType: 'html',

            url: url,
            data: serialize
                ?serialize(data)
                
                //jQuery will use $.param(data) to serialize data
                :data,

            success: function (html) {
                var isServerDefinedError = tryHandleServerDefinedError(html);
                if (isServerDefinedError) {
                    return;
                }

                success(html);
            },
            complete: complete,
            error: function (xhr) {
                var status = xhr.status,
                    responseText = xhr.responseText;

                //chrome bug
                //when continuous refresh the browse or network break off, this will happen.
                if (status === 0 && responseText === '') {
                    return;
                }

                window.console && window.console.error(responseText);
            }
        });
    }

    function tryHandleServerDefinedError(script) {
        var regexp = /^<script>((?:\r|\r\n|\n|.)*)<\/script>$/,
            match = regexp.exec(script),
            isServerDefinedError = match != null;

        isServerDefinedError
            && $.globalEval(match[1]);

        return isServerDefinedError;
    }

} (jQuery));