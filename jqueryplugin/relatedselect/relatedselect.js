(function ($) {

    $.pluginManager.extend('relatedSelect', {
        init: init
    });

    function init() {
        var selects = arguments[0].selects,
            data = arguments[0].data,

            initial = arguments[0].initial,
            change = arguments[0].change;

        initial.call(selects, data);

        _.each(selects, function ($select, index) {
            $select.change(function () {
                change.call(selects, data, index);
            });
        });
    }
} (jQuery));