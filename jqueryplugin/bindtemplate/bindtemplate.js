(function ($) {
    $.pluginManager.extend('bindTemplate', {
        setData: setData,
        getData: getData
    });

    function setData() {
        var $container = this.eq(0),

            attr = arguments[0].attr,
            data = arguments[0].data,
            set = arguments[0].set,

            dotProperties = getDotProperties(data);

        _.each(dotProperties, function (dotProperty) {
            var value = getDotPropertyValue(data, dotProperty),

                bracketProperty = dotProperty.replace(/[.](\d+)/g, '[$1]').replace(/^(\d+)/, '[$1]'),
                selector = '[{0}="{1}"]'.replace('{0}', attr).replace('{1}', bracketProperty),
                $field = $container.attr(attr) == null
                    ? $container.find(selector)
                    : $container.find(selector).andSelf();

            set.call($field, value);
        });

        return this;
    }

    function getData() {
        var $container = this.eq(0),

            attr = arguments[0].attr,
            get = arguments[0].get,

            $fields = $container.attr(attr) == null
                ? $container.find('[{0}]'.replace('{0}', attr))
                : $container.find('[{0}]'.replace('{0}', attr)).andSelf();

        if ($fields.length === 0) {
            return null;
        }

        var dotPropertiesAndValues = _.reduce($fields, function (m, v) {
            var $field = $(v),

                bracketProperty = $field.attr(attr),
                dotProperty = bracketProperty.replace(/\[(\d+)\]/g, '.$1').replace(/^([.])/, ''),

                value = get.call($field);

            m.push({
                dotProperty: dotProperty,
                value: value
            });

            return m;
        }, []);

        return createObject(dotPropertiesAndValues);
    }

    function getDotProperties(obj) {
        return (function (currentObj, currentPos) {
            var thisFunc = arguments.callee,
                keys = _.keys(currentObj);

            if (keys.length === 0) {
                return currentPos.join('.');
            }

            return _.reduce(keys, function (m, v) {
                return m.concat(thisFunc(currentObj[v], currentPos.concat(v)));
            }, []);
        } (obj, []));
    }

    function getDotPropertyValue(obj, dotProperty) {
        return _.reduce(dotProperty.split('.'), function (m, v) {
            return m[v];
        }, obj);
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