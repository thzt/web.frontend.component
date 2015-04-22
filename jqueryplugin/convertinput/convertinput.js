(function ($) {
    $.pluginManager.extend('convertInput', {
        setValue: setValue,
        getValue: getValue
    });

    function setValue() {
        var $inputs = this,
            set = arguments[0].set,
            value = arguments[0].value;

        $inputs.each(function () {
            var $input = $(this);

            set.call($input, value);
        });

        return this;
    }

    function getValue() {
        var $inputs = this,
            get = arguments[0].get;

        return get.call($inputs.eq(0));
    }

} (jQuery));
