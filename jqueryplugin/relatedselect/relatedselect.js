(function ($) {

    $.pluginManager.extend('relatedSelect', {
        init: init
    });

    function init() {
        var $primary = arguments[0].primary,
            $related = arguments[0].related,

            data = arguments[0].data,

            initial = arguments[0].initial,
            getSelectedValue = arguments[0].getSelectedValue,
            fillRelated = arguments[0].fillRelated;

        initial.call({
            primary: $primary,
            related: $related
        }, data);

        $primary.change(function () {
            var $select = $(this),
                value = getSelectedValue.call($select);

            fillRelated.call($related, value, data);
        });
    }
} (jQuery));