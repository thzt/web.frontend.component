//use:
//$.fn.val
//$.fn.html
//$.fn.attr
//$.fn.is

(function ($) {
    $.pluginManager.filter('bindTemplate', {
        setData: filterSetData,
        getData: filterGetData
    });

    function filterSetData() {
        var $selector = this,

            attr = arguments[0] && arguments[0].attr,
            data = arguments[0] && arguments[0].data,
            set = arguments[0] && arguments[0].set;

        return [{
            attr: attr || 'data-model',
            data: data,
            set: set || function (value) {
                var $item = this;

                switch (true) {
                    case $item.is(':text,textarea,select'):
                        $item.val(value);
                        break;

                    case $item.is(':checkbox,:radio'):
                        $item.attr('checked', 'checked');
                        break;

                    case $item.is('span'):
                        $item.html(value);
                        break;

                    case $item.is('div'):
                    case $item.is('tr'):
                    case $item.is('td'):
                        $item.attr('data-value', value);
                        break;

                    default:
                        break;
                }
            }
        }];
    }

    function filterGetData() {
        var $selector = this,

            attr = arguments[0] && arguments[0].attr,
            get = arguments[0] && arguments[0].get;

        return [{
            attr: attr || 'data-model',
            get: get || function () {
                var $item = this;

                switch (true) {
                    case $item.is(':text,textarea,select'):
                        return $item.val();

                    case $item.is(':checkbox,:radio'):
                        return $item.is(':checked');

                    case $item.is('span'):
                        return $item.html().trim();

                    case $item.is('div'):
                    case $item.is('tr'):
                    case $item.is('td'):
                        return $item.attr('data-value');

                    default:
                        return null;
                }
            }
        }];
    }

} (jQuery));
