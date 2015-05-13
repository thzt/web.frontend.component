(function ($, location) {

    $.extend({
        downloadTool: {
            download: download
        }
    });

    function download() {
        var filePath = arguments[0].filePath,
            saveAsFileName = arguments[0].saveAsFileName;

        location.href = '/Tool/Download?filePath=' + decodeURIComponent(filePath) + '&saveAsFileName=' + decodeURIComponent(saveAsFileName);
    }
} (jQuery, window.location));