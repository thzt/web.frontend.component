(function ($) {
    $.pluginManager.extend('bindTemplate', {
        init: init,
        fill: fill,
        getData: getData
    });

    function init() {
        var container = this.eq(0),
            attr = arguments[0];

        container.attr('data-thzt-bindtemplate-attr', attr);
        return this;
    }

    function fill() {
        var $container = this.eq(0),
            data = arguments[0],
            attr = $container.attr('data-thzt-bindtemplate-attr'),

            properties = getProperties(data);

        _.each(properties, function (v) {
            var selector = '[{0}="{1}"]'.replace('{0}', attr).replace('{1}', v),
                value = getValue(data, v),
                $view = $container.find(selector);

            switch (true) {
                case $view.is('input'):
                case $view.is('select'):
                    $view.val(value);
                    break;

                case $view.is('span'):
                    $view.html(value);
                    break;
            }
        });
    }

    function getData() {
        var $container = this.eq(0),
            attr = $container.attr('data-thzt-bindtemplate-attr'),

            $views = $container.find('[{0}]'.replace('{0}', attr)),

            propertyAndValues = _.reduce($views, function (m, v) {
                var $view = $(v),
                property = $view.attr(attr),
                value = (function () {
                    switch (true) {
                        case $view.is('input'):
                        case $view.is('select'):
                            return $view.val();

                        case $view.is('span'):
                            return $view.html();
                    }
                } ());

                m.push({
                    property: property,
                    value: value
                });

                return m;
            }, []);

        return createObject(propertyAndValues);
    }

    function getProperties(obj) {
        return (function (obj, pos) {
            var thisFunc = arguments.callee,
                keys = _.keys(obj);

            if (keys.length === 0) {
                return pos.join('.');
            }

            return _.reduce(keys, function (m, v) {
                return m.concat(thisFunc(obj[v], pos.concat(v)));
            }, []);
        } (obj, []));
    }

    function getValue(obj, property) {
        return _.reduce(property.split('.'), function (m, v) {
            return m[v];
        }, obj);
    }

    function createObject(propertyAndValues) {
        var obj = {};

        _.each(propertyAndValues, function (v) {
            var property = v.property,
                value = v.value,
                pos = property.split('.'),

                current = obj;

            _.each(pos, function (v, i) {
                if (i === pos.length - 1) {
                    current[v] = value;
                    return;
                }

                if (current[v] == null) {
                    current[v] = {};
                    current = current[v];
                    return;
                }

                current = current[v];
            }, {});
        });

        return obj;
    }

} (jQuery));