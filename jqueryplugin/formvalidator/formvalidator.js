(function ($) {
    $.pluginManager.extend('formValidator', {
        check: check
    });

    function check() {
        var $selector = this,
            validate = arguments[0].validate,
            success = arguments[0].success,
            failed = arguments[0].failed,

            $illegalItems = $selector.filter(function () {
                var $item = $(this);

                return !validate.call($item);
            }),
            illegalItemCount = $illegalItems.length;

        if (illegalItemCount === 0) {
            success();
            return this;
        }

        failed.call($illegalItems.eq(0));
        return this;
    }

} (jQuery));
