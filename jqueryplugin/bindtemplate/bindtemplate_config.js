//use:
//$.fn.val
//$.fn.html
//$.fn.attr
//$.fn.is

(function ($) {
    $.pluginManager.filter('bindTemplate', {
		getData: filterGetData,
        setData: filterSetData
        
    });

    function filterGetData() {
        var $selector = this,

            attr = arguments[0] && arguments[0].attr,
            get = arguments[0] && arguments[0].get;

        return [{
            attr: attr || 'data-model',
            get: get || function () {
                var $item = this;

                switch (true) {
                    case $item.is(':text,:password,textarea,select'):
                        return $item.val();

                    case $item.is(':checkbox,:radio'):
                        return $item.is(':checked');

                    default:
                        return $item.html();
                }
            }
        }];
    }

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
                    case $item.is(':text,:password,textarea,select'):
                        $item.val(value);
                        break;

                    case $item.is(':checkbox,:radio'):
                        $item.attr('checked', 'checked');
                        break;

                    default:
					    $item.html(value);
                        break;
                }
            }
        }];
    }

} (jQuery));
