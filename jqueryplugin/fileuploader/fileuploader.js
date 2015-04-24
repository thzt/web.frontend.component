(function ($) {
    $.pluginManager.extend('fileUploader', {
        init: init,

        pick: pick,
        upload: upload,

        clear: clear,
        isPicked: isPicked
    });

    function init() {
        var $container = this.eq(0);

        $container.html('<input type="file" />').hide();
        return this;
    }

    function pick() {
        var $container = this.eq(0),
            success = arguments[0].success;

        $container
            .html('<input type="file" />')
            .find('>:file')
            .change(function () {
                var $button = $(this);

                success($button.val());
            })
            .click();

        return this;
    }

    function upload() {
        var $container = this.eq(0),

            url = arguments[0].url,
            data = arguments[0].data,
            success = arguments[0].success;

        if (!isPicked.call($container)) {
            return this;
        }

        var xhr = new XMLHttpRequest(),
            formData = new FormData();

        formData.append('json', JSON.stringify(data));
        formData.append('file', $container.find('>:file')[0].files[0]);

        xhr.open('post', url, true);  //ture means async request
        xhr.onload = function () {
            success.call(xhr, eval('(' + xhr.responseText + ')'));
        };
        xhr.send(formData);

        return this;
    }

    function isPicked() {
        var $container = this.eq(0),

            $file = $container.find('>:file'),
            isPickedFile = $file.val() !== '';

        return isPickedFile;
    }

    function clear() {
        var $container = this.eq(0);

        $container.html('<input type="file" />');
        return this;
    }

} (jQuery));