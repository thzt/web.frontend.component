(function ($) {
    $.pluginManager.extend('bindTemplate', {
        setData: setData
    });

    function setData() {
        var $containers = this,

            attr = arguments[0].attr,
            data = arguments[0].data,
            set = arguments[0].set,

            dotProperties = getDotProperties(data);

        _.each(dotProperties, function (dotProperty) {
            var value = getDotPropertyValue(data, dotProperty),

                bracketProperty = dotProperty.replace(/[.](\d+)/g, '[$1]').replace(/^(\d+)/, '[$1]'),
                selector = '[{0}="{1}"]'.replace('{0}', attr).replace('{1}', bracketProperty),
                $fields = getFields.call($containers, selector);

            $fields.each(function (index) {
                var $field = $(this);

                set.call($field, value, selector, index);
            });
        });

        return this;
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

    function getFields(selector) {
        var $containers = this;

        return $containers.find(selector).add($containers.filter(function () {
            var $container = $(this);

            return $container.is(selector);
        }));
    }
} (jQuery));
