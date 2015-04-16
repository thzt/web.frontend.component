(function ($) {
    $.styleManager = {
        install: install,
        uninstall: uninstall
    };

    function install() {
        var href = arguments[0].href,
            success = arguments[0].success,

            $link = $('<link rel="stylesheet" type="text/css" />');

        $link[0].href = href;
        $link[0].async = true;
        $link[0].onload = function () {
            success && success();
        };

        $('head')[0].appendChild($link[0]);
        return this;
    }

    function uninstall() {
        var href = arguments[0].href;

        $('link[href="' + href + '"]').remove();
        return this;
    }

} (jQuery));