//use
//$.fn.add
//$.fn.find
//$.fn.filter
//$.fn.attr
//$.fn.each
//window.viewModelTool

(function ($, global) {
    $.pluginManager.extend('bindTemplate', {
        setData: setData
    });

    var viewModelTool = global.viewModelTool;

    function setData() {
        var $containers = this,

            attr = arguments[0].attr,
            data = arguments[0].data,
            set = arguments[0].set,

            selector = '[{0}]'.replace('{0}', attr),
            $fields = $containers.find(selector).add($containers.filter(selector));

        $fields.each(function () {
            var $field = $(this),

                prop = $field.attr(attr),
                value = viewModelTool.focus.call(data, prop),

                attribute = '{0}="{1}"'.replace('{0}', attr).replace('{1}', prop);

            set.call($field, value, attribute);
        });

        return this;
    }

} (jQuery, window));
