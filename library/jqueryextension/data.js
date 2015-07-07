(function($){
	
	$.prototype.extend({
		data:data
	});
	
	function data(key,value){
		var $elements=this;
		
		if(value==null){
			return getData.call($elements,key);
		}
		
		return setData.call($elements,key,value);
	}
	
	function getData(key){
		var $elements=this,
			isAllSame=[].every.call($elements,function(v){
				if(v.data==null){
					return false;
				}
				
				if(v.data[key]==null){
					return false;
				}
				
				return $elements[0].data[key]===v.data[key];
			});
			
		if(!isAllSame){
			return null;
		}
		
		return $elements[0].data[key];
	}
	
	function setData(key,value){
		var $elements=this;
		
		$elements.each(function(){
			var htmlElement=this;
			
			htmlElement.data=htmlElement.data||{};
			htmlElement.data[key]=value;
		});
		
		return this;
	}
	
}(jQuery));