(function ($) {

    $.pluginManager.extend('loading', {
        show: show,
        hide: hide
    });

    var $loading;

    function show() {
        $loading == null
            ? ($loading =
                $('\
                    <div>\
                        <img src="img/loading.gif" />\
                    </div>\
                ')
                .addClass('thzt_loading')
                .appendTo('body'))
            : $loading.show();

        return this;
    }

    function hide() {
        $loading.hide();

        return this;
    }

} (jQuery));