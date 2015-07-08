//use
//$.fn.add
//$.fn.find
//$.fn.filter
//$.fn.attr

(function ($) {
    $.pluginManager.extend('bindTemplate', {
        setData: setData
    });

    function setData() {
        var $containers = this,

            attr = arguments[0].attr,
            data = arguments[0].data,
            set = arguments[0].set,

            selector = '[{0}]'.replace('{0}', attr),
            $fields = $containers.find(selector).add($containers.filter(selector));

        $fields.each(function () {
            var $field = $(this),
                bracketProperty = $field.attr(attr),
                dotProperty = bracketProperty.replace(/\[(\d+)\]/g, '.$1').replace(/^([.])/, ''),
                value = getDotPropertyValue.call(data, dotProperty),
                attribute = '{0}="{1}"'.replace('{0}', attr).replace('{1}', bracketProperty);

            set.call($field, value, attribute);
        });

        return this;
    }

    function getDotPropertyValue(dotProperty) {
        var obj = this;

        return _.reduce(dotProperty.split('.'), function (m, v) {
            return m[v];
        }, obj);
    }
} (jQuery));
