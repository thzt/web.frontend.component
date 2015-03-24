(function ($, document) {

    $.pluginManager.filter('formValidator', {
        check: filterCheck
    });

    function filterCheck() {
        var $selector = this,
            success = arguments[0].success;

        return [{
            validate: function () {
                var $item = this,

                    value = $item.val(),
                    regexp = new RegExp($item.attr('data-regexp')),

                    match = regexp.exec(value);

                return match != null;
            },
            success: success,
            failed: function () {
                var $item = this,
                    message = $item.attr('data-warning');

                showWarning.call($item, message);
            }
        }];
    }

    //-- private fields and functions --

    var timer;

    function showWarning(message) {
        var $item = this;

        window.clearTimeout(timer);
        $(document).find('.thzt_formvalidator').remove();

        $item.before('<span class="thzt_formvalidator">' + message + '</span>');
        timer = setTimeout(function () {
            $item.prev('.thzt_formvalidator').remove();
        }, 3000);
    }

} (jQuery, document));
