(function ($) {

    $.pluginManager.extend('webUploaderWrapper', {
        init: init,
        pick: pick,
        upload: upload
    });

    function init() {
        var $container = this.eq(0),

            uploader = WebUploader.create({
                swf: '/Vendor/plugin/webuploader/Uploader.swf',
                pick: $container,
                resize: false
            });

        uploader.on('fileQueued', function (file) {
            var afterPick = $container.data('webUploaderWrapper_event_afterPick');

            afterPick.call(uploader, file.id, file.name);
        });

        uploader.on('uploadSuccess', function (file, response) {
            var afterUpload = $container.data('webUploaderWrapper_event_afterUpload');

            afterUpload.call(uploader, response);
        });

        $container.data('webUploaderWrapper_uploader', uploader).hide();
        return this;
    }

    function pick() {
        var $container = this.eq(0),
            afterPick = arguments[0].afterPick;

        $container.data('webUploaderWrapper_event_afterPick', afterPick);

        $container.find('input[type=file]').click();
        return this;
    }

    function upload() {
        var $container = this.eq(0),

            url = arguments[0].url,
            id = arguments[0].id,
            afterUpload = arguments[0].afterUpload,

            uploader = $container.data('webUploaderWrapper_uploader');

        $container.data('webUploaderWrapper_event_afterUpload', afterUpload);
        uploader.option('server', url);

        //because webuploader support to upload multiple files
        //pass file id, only upload one file.
        uploader.upload(id);

        return this;
    }

} (jQuery));