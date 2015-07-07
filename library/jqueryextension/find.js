//use: 
//$.prototype.each

(function($){
		
	$.prototype.extend({
		find:find
	});
	
	function find(selector){
		var $elements=this,
			resultList=[];
			
		$elements.each(function(){
			var parentItem=this,
				$collection=$(selector);
			
			$collection.each(function(){
				var item=this,
					isContain=resultList.some(function(current){
						return current===item;
					});
				
				if(isContain){
					return;
				}
				
				if(!isChildOf.call(item,parentItem)){
					return;
				}
				
				resultList.push(item);
			});
		});
			
		return $(resultList);
	}
	
	function isChildOf(parent){
		var child=this,
			parentElement=child.parentElement;
		
		//because: document.documentElement.parentElement===null
		if(parentElement==null){
			return false;
		}
		
		if(parentElement===parent){
			return true;
		}
		
		return isChildOf.call(parentElement,parent);
	}
	
}(jQuery));