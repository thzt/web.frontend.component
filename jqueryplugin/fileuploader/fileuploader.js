(function ($) {
    $.pluginManager.extend('fileUploader', {
        init: init,

        pick: pick,
        upload: upload,

        clear: clear,
        isPicked: isPicked,

        response: response
    });

    var uploadSuccessHandler;

    function init() {
        var $container = this.eq(0),

            timestamp = +new Date(),
            iframeName = 'thzt_fileuploader_iframe_name' + timestamp;

        //set form.target to iframe, will change iframe src to form's action
        $container.html('\
            <iframe name="' + iframeName + '"></iframe>\
            <form \
                method="post" \
                action="" \
                enctype="multipart/form-data" \
                target="' + iframeName + '">\
                    <input type="file" name="file" />\
                    <input type="text" name="json" />\
            </form>').hide();

        return this;
    }

    function pick() {
        var $container = this.eq(0),
            success = arguments[0].success,

            $filePickButton = $container.find('input[type=file]');

        $filePickButton.unbind('change').bind('change', function () {
            var $button = $(this),
                filePath = $button.val();

            success.call(null, filePath);
        }).click();

        return this;
    }

    function upload() {
        var $container = this.eq(0),
            url = arguments[0].url,
            data = arguments[0].data,
            success = arguments[0].success,

            $form = $container.find('form');

        uploadSuccessHandler = success;

        $form.find(':text').val(JSON.stringify(data));
        $form.attr('action', url).submit();

        return this;
    }

    function isPicked() {
        var $container = this.eq(0);

        return $container.find('input[type=file]').val() !== '';
    }

    function clear() {
        var $container = this.eq(0);

        $container.find('input[type=file]').val('');
        return this;
    }

    function response() {
        var responseJson = arguments[0];

        uploadSuccessHandler.call(null, responseJson);
    }

} (jQuery));