(function ($) {
    $.sendAjax = function () {
        var url = arguments[0].url,
            data = arguments[0].data,
            type = arguments[0].type,
            dataType = arguments[0].dataType,

            success = arguments[0].success,
            complete = arguments[0].complete;

        $.ajax({
            cache: false,
            type: type || 'post',
            dataType: dataType || 'json',

            url: url,
            data: data,

            success: success,
            complete: complete,
            error: function (xhr, statusText, errorThrown) {
                handleError.call(xhr, url, data, statusText);
            }
        });
    };

    function handleError(url, data, statusText) {
        var xhr = this;

        //chrome bug
        //when continuous refresh the browse or network break off, this will happen.
        if (xhr.status === 0 && xhr.responseText === '') {
            return;
        }

        var responseText = xhr.responseText,
            regexp = /^<script>((?:\r|\r\n|\n|.)*)<\/script>$/,
            match = regexp.exec(responseText),
            isServerDefinedError = match != null;

        if (isServerDefinedError) {
            $.globalEval(match[1]);
            return;
        }

        var errorMessage = '$.sendAjax error.\n'
            + 'url: ' + url + '\n'
            + 'data: ' + JSON.stringify(data) + '\n'
            + 'statusText: ' + statusText + '\n'
            + 'responseText: ' + xhr.responseText;

        window.console && window.console.error(errorMessage);
    }

} (jQuery));