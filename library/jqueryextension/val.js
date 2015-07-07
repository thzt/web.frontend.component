//use: 
//$.prototype.each

(function($){
	
	$.prototype.extend({
		val:val
	});
	
	function val(value){
		var $elements=this;
		
		if(value==null){
			return getValue.call($elements);
		}
		
		return setValue.call($elements,value);
	}
	
	function getValue(){
		var $elements=this;
		
		return $elements[0].value;		
	}
	
	function setValue(value){
		var $elements=this;
		
		$elements.each(function(){
			var htmlElement=this;
			
			htmlElement.value=value;
		});
		
		return this;
	}
}(jQuery));