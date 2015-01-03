//version 1.0.1

(function($){
    var cache={};

	$.extend({
		pluginManager:{
			extend:extend
		}
	});

	function extend(pluginName,operationSet){
		cache[pluginName]==null
			&&createNewPlugin(pluginName);
			
		extendOldPlugin(pluginName,operationSet);
		return this;
	}

	function createNewPlugin(pluginName){
		var plugin={};
		
		cache[pluginName]=plugin[pluginName]=function(operationName){
			var $selector=this,
				operation=cache[pluginName][operationName];

			return operation.apply($selector,[].slice.call(arguments,1));
		};

		$.prototype.extend(plugin);
	}
	
	function extendOldPlugin(pluginName,operationSet){
		for(var operationName in operationSet){
			if(!operationSet.hasOwnProperty(operationName)){
				continue;
			}
			
			cache[pluginName][operationName]=operationSet[operationName];
		}
	}
}(jQuery));