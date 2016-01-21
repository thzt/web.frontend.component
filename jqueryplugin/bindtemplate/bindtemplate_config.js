//use

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
                var $item = this,
					args=arguments;

				$().bindTemplate('enumerateCase',function(val,index){
					var predicator=val.predicator,
						getter=val.getter;

					if(predicator.call($item)){
						result=getter.apply($item,args);
						return false;
					}
				});

				return result;
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
                var $item = this,
					args=arguments;

				$().bindTemplate('enumerateCase',function(val,index){
					var predicator=val.predicator,
						setter=val.setter;

					if(predicator.call($item)){
						setter.apply($item,args);
						return false;
					}
				});

				return this;
            }
        }];
    }

} (jQuery));
