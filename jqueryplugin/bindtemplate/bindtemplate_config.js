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
					caseList=$().bindTemplate('getCaseList'),
					result;

				caseList.every(function(v){
					var predicator=v.predicator,
						getter=v.getter;

					if(predicator.call($item)){
						result=getter.call($item);
						return false;
					}

					return true;
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
					caseList=$().bindTemplate('getCaseList');

				caseList.every(function(v){
					var predicator=v.predicator,
						setter=v.setter;

					if(predicator.call($item,value)){
						setter.call($item,value);
						return false;
					}

					return true;
				});
            }
        }];
    }

} (jQuery));
