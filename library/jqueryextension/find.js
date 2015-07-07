(function($){
		
	$.prototype.extend({
		find:find
	});
	
	function find(selector){
		var $elements=this,
			resultList=[];
		
		[].every.call($elements,function(parentItem){			
			var collection=document.querySelectorAll(selector);
			
			[].every.call(collection,function(item){
				
				var isContain=resultList.some(function(current){
					return current===item;
				});
				
				if(isContain){
					return true;
				}
				
				if(!isChildOf.call(item,parentItem)){
					return true;
				}
				
				resultList.push(item);
				return true;
			});
		});
			
		return $(resultList);
	}
	
	function isChildOf(parent){
		var child=this,
			parentElement=child.parentElement;
		
		if(parentElement==null){
			return false;
		}
		
		if(parentElement===parent){
			return true;
		}
		
		return isChildOf.call(parentElement,parent);
	}
	
}(jQuery));