(function ($) {

    $.pluginManager.filter('convertInput', {
        setValue: setValueFilter,
        getValue: getValueFilter
    });

    function setValueFilter() {
        var value = arguments[0].value;

        return [{
            value: value,
            set: function (val) {
                var $input = this,
                    regexp = /^(?:\d+(?:[.]\d+)?)$/,
                    match = regexp.exec(val);

                if (match == null) {
                    $input.val('0 %');
                    return;
                }

                $input.val(+val * 100 + ' %');
            }
        }];
    }

    function getValueFilter() {
        return [{
            get: function () {
                var $input = this,
                    value = $input.val(),
                    regexp = /^(\d+(?:[.]\d+)?) %$/,
                    match = regexp.exec(value);

                if (match == null) {
                    return 0;
                }

                return +match[1] / 100;
            }
        }];
    }

} (jQuery));
