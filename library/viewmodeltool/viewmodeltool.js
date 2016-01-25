(function(global){
	global.viewModelTool={
		focus:focus,
		collect:collect
	};

	//pubilc

	function focus(prop){
		var obj=this,
			dotProp=convertBracketToDot(prop),
			value=getDotPropValue.call(obj,dotProp);

		return value;
	}
	
	function collect(propValueMaps){
        if(propValueMaps.length===0){
            return null;
        }

		//propValueMaps: [{prop:'[1].a[2].b',value:3}, ...]		
		var dotPropValueMaps=getDotPropValueMaps(propValueMaps);
        return createObject(dotPropValueMaps);
	}

	//private 
	
	function convertBracketToDot(prop){
		return prop.replace(/\[(\d+)\]/g,'.$1').replace(/^([.])/,'');
	}

    function getDotPropValue(dotProperty) {
        var obj=this;

        return [].reduce.call(dotProperty.split('.'),function(m,v){
            return m[v];
        },obj);
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
        var obj=isNumber(dotPropValueMaps[0].dotProp.split('.')[0])
				?[]
				:{};

        [].forEach.call(dotPropValueMaps,function(item){
            var dotProp=item.dotProp,
                value=item.value,
                propList=dotProp.split('.'),

                current=obj;

            [].forEach.call(propList,function(prop,index){
                if(index===propList.length-1){
                    current[prop]=value;
                    return;
                }

                if(current[prop]!=null){
                    current=current[prop];
                    return;
                }

                if(isNumber(propList[index+1])){
                    current[prop]=[];
                    current=current[prop];
                    return;
                }

                current[prop]={};
                current=current[prop];
            },{});
        });

        return obj;
    }

    function isNumber(v){
        return +v+''===v;
    }
}(window));
