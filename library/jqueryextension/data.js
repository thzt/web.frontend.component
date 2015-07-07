//use: 
//$.prototype.each

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
			isValid=true;
			
		$elements.each(function(){
			var item=this;
			
			if(item.data==null
				||item.data[key]==null
				||$elements[0].data[key]!==item.data[key]){
					
				isValid=false;
				return false;
			}
		});
		
		if(!isValid){
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