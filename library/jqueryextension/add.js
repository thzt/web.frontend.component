(function($){
	
	$.prototype.extend({
		add:add
	});
	
	function add($others){
		var $elements=this;
		
		[].forEach.call($others,function(item){
			var isContain=[].some.call($elements,function(v){
				return v===item;
			});
			
			if(isContain){
				return;
			}
			
			$elements[$elements.length]=item;
			$elements.length++;
		});
		
		return $elements;
	}
	
}(jQuery));