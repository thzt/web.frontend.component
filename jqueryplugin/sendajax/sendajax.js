(function ($) {
    $.sendAjax = function () {
        var url = arguments[0].url,
            data = arguments[0].data,
            success = arguments[0].success,
            complete = arguments[0].complete,

            console = window.console;

        $.ajax({
            cache: false,
            type: 'post',
            dataType: 'json',

            url: url,
            data: data,
            success: function (r) {
                if (!r.status) {
                    var errorMessage = '$.sendAjax response.status is unexpected.\n'
                        + 'url: ' + url + '\n'
                        + 'data: ' + JSON.stringify(data) + '\n'
                        + 'responseText: ' + JSON.stringify(r);

                    console && console.error(errorMessage);
                    alert(r.content);

                    return;
                }

                success && success.call(this, r.content);
            },
            error: function (xhr, statusText, errorThrown) {

                //chrome bug
                //when continuous refresh the browse or network break off, this will happen.
                if (xhr.status === 0 && xhr.responseText === '') {
                    return;
                }

                var errorMessage = '$.sendAjax error.\n'
                    + 'url: ' + url + '\n'
                    + 'data: ' + JSON.stringify(data) + '\n'
                    + 'statusText: ' + statusText + '\n'
                    + 'responseText: ' + xhr.responseText;

                console && console.error(errorMessage);
                alert(errorMessage);
            },
            complete: function () {
                complete && complete.apply(this, arguments);
            }
        });
    };
} (jQuery));