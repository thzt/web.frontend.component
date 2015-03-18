(function ($) {
    $.pluginManager.extend('bindTemplate', {
        getData: getData
    });

    function getData() {
        var $containers = this,

            attr = arguments[0].attr,
            get = arguments[0].get,

            selector = '[{0}]'.replace('{0}', attr),
            $fields = $containers.find(selector).add($containers.filter(selector));

        if ($fields.length === 0) {
            return null;
        }

        var dotPropertiesAndValues = _.reduce($fields, function (m, v) {
            var $field = $(v),

                bracketProperty = $field.attr(attr),
                dotProperty = bracketProperty.replace(/\[(\d+)\]/g, '.$1').replace(/^([.])/, ''),
                attribute = '{0}="{1}"'.replace('{0}', attr).replace('{1}', bracketProperty),

                value = get.call($field, attribute);

            m.push({
                dotProperty: dotProperty,
                value: value
            });

            return m;
        }, []);

        return createObject(dotPropertiesAndValues);
    }

    function createObject(dotPropertiesAndValues) {
        var obj = isNumber(dotPropertiesAndValues[0].dotProperty.split('.')[0])
            ? []
            : {};

        _.each(dotPropertiesAndValues, function (v) {
            var dotProperty = v.dotProperty,
                value = v.value,
                propertyList = dotProperty.split('.'),

                current = obj;

            _.each(propertyList, function (v, i) {

                if (i === propertyList.length - 1) {
                    current[v] = value;
                    return;
                }

                if (current[v] != null) {
                    current = current[v];
                    return;
                }

                if (isNumber(propertyList[i + 1])) {
                    current[v] = [];
                    current = current[v];
                    return;
                }

                current[v] = {};
                current = current[v];
            }, {});
        });

        return obj;
    }

    function isNumber(v) {
        return +v + '' === v;
    }
} (jQuery));
