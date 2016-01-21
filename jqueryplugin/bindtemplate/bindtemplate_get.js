//use
//$.fn.find
//$.fn.add
//$.fn.filter
//$.fn.attr
//window.viewModelTool

(function($,global){
    $.pluginManager.extend('bindTemplate',{
        getData:getData
    });

	var viewModelTool=global.viewModelTool;

    function getData(){
        var $containers=this,

            attr=arguments[0].attr,
            get=arguments[0].get,

            selector='[{0}]'.replace('{0}',attr),
            $fields=$containers.find(selector).add($containers.filter(selector)),

			propValueMaps=[].reduce.call($fields,function(m,v){
				var $field=$(v),

					prop=$field.attr(attr),
					attribute='{0}="{1}"'.replace('{0}',attr).replace('{1}',prop),

					value=get.call($field,attribute);

				//if 'return;' or 'return undefined;' then ignore this item.
				if(value===undefined){
					return m;
				}

				m.push({
					prop:prop,
					value:value
				});

				return m;
			},[]);

		return viewModelTool.getViewModel(propValueMaps);
    }
	
}(jQuery,window));
