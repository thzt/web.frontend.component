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
                var $item = this;

                switch (true) {
                    case $item.is('[data-percentage-convert]'):
                        handlePercentageConvertSetter.call($item, val);
                        break;

                    case $item.is('[data-thousand-unit]'):
                        handleThousandUnitSetter.call($item, val);
                        break;
                }
            }
        }];
    }

    function getValueFilter() {
        return [{
            get: function () {
                var $item = this;

                switch (true) {
                    case $item.is('[data-percentage-convert]'):
                        return handlePercentageConvertGetter.call($item);

                    case $item.is('[data-thousand-unit]'):
                        return handleThousandUnitGetter.call($item);
                }
            }
        }];
    }

    // private tools -->

    // -- set

    function handlePercentageConvertSetter(value) {
        var $item = this,
            regexp = /^-?\d+(?:[.]\d+)?$/,
            match = regexp.exec(value),
            displayValue = match == null
                ? '0.00 %'
                : (+value * 100).toFixed(2) + ' %';

        setValueToField.call($item, displayValue);
    }

    function handleThousandUnitSetter(value) {
        var $item = this,
            displayValue = (Math.round(+value / 1000) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');

        setValueToField.call($item, displayValue);
    }

    function setValueToField(value) {
        var $item = this;

        switch (true) {
            case $item.is(':text'):
                $item.val(value);
                break;

            case $item.is('span'):
                $item.html(value);
                break;
        }
    }

    // -- get

    function handlePercentageConvertGetter() {
        var $item = this,
            value = getValueOfField.call($item),
            regexp = /^(-?\d+(?:[.]\d+)?) %$/,
            match = regexp.exec(value),
            getterValue = match == null
                ? 0
                : +(+match[1] / 100).toFixed(4);

        return getterValue;
    }

    function handleThousandUnitGetter() {
        var $item = this,
            value = getValueOfField.call($item),
            getterValue = +(value.replace(/,/g, '')) * 1000;

        return getterValue;
    }

    function getValueOfField() {
        var $item = this;

        switch (true) {
            case $item.is(':text'):
                return $item.val();

            case $item.is('span'):
                return $item.html();
        }
    }

} (jQuery));
