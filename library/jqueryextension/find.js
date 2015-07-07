(function($){
	
	$.prototype.extend({
		find:find
	});
	
	function find(selector){
		var $elements=this,
			resultList=[];
		
		$elements.each(function(){
			var element=this,
				collection=element.querySelectorAll(selector);
				
			[].every.call(collection,function(item){
				var isContain=resultList.some(function(current){
					return current===item;
				});
				
				if(isContain){
					return true;
				}
				
				resultList.push(item);
				return true;
			});
		});
			
		return $(resultList);
	}
	
}(jQuery));