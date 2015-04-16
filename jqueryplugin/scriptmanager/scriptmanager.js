(function ($) {
    $.scriptManager = {
        load: load,
        remove: remove
    };

    function load() {
        var src = arguments[0].src,
            success = arguments[0].success,

            $script = $('<script></script>');

        $script[0].src = src;
        $script[0].async = true;
        $script[0].onload = function () {
            success && success();
        };

        $('head')[0].appendChild($script[0]);
        return this;
    }

    function remove() {
        var src = arguments[0].src;

        $('script[src="' + src + '"]').remove();
        return this;
    }

} (jQuery));