(function(global){
	global.viewModelTool={
		getValueFromPath:getValueFromPath,
		getViewModel:getViewModel
		
	};

	//pubilc 

	function getValueFromPath(obj,prop){
		var dotProp=convertBracketToDot(prop),
			value=getDotPropValue.call(obj,dotProp);

		return value;
	}
	
	function getViewModel(propValueMaps){

		//propValueMaps: [{prop:'[1].a[2].b',value:3}, ...]		
		var dotPropValueMaps=getDotPropValueMaps(propValueMaps);

        if (dotPropValueMaps.length === 0) {
            return null;
        }

        return createObject(dotPropValueMaps);
	}

	//private 
	
	function convertBracketToDot(prop){
		return prop.replace(/\[(\d+)\]/g, '.$1').replace(/^([.])/, '');
	}

    function getDotPropValue(dotProperty) {
        var obj = this;

        return [].reduce.call(dotProperty.split('.'), function (m, v) {
            return m[v];
        }, obj);
    }

	function getDotPropValueMaps(propValueMaps){
		return propValueMaps.map(function(item){
			var prop=item.prop,
				value=item.value,

				//convert bracket property to dot property
				//[1].a[2].b -> 1.a.2.b
				dotProp=convertBracketToDot(prop);
			
			return {
				dotProp:dotProp,
				value:value
			};
		});
	}

	function createObject(dotPropValueMaps) {
        var obj = isNumber(dotPropValueMaps[0].dotProp.split('.')[0])
				? []
				: {};

        [].forEach.call(dotPropValueMaps, function (item) {
            var dotProp = item.dotProp,
                value = item.value,
                propList = dotProp.split('.'),

                current = obj;

            [].forEach.call(propList, function (prop, index) {

                if (index === propList.length - 1) {
                    current[prop] = value;
                    return;
                }

                if (current[prop] != null) {
                    current = current[prop];
                    return;
                }

                if (isNumber(propList[index + 1])) {
                    current[prop] = [];
                    current = current[prop];
                    return;
                }

                current[prop] = {};
                current = current[prop];
            }, {});
        });

        return obj;
    }

    function isNumber(v) {
        return +v + '' === v;
    }
}(window));
