(function(global){
	
	//import
	var document=global.document;
	
	//export
	window.findAll=findAll;
	
	//private region
	function findAll(selector){
		var parentCollection=this;
		
		if(parentCollection===global){
			return document.querySelectorAll(selector);
		}
		
		var resultList=[];
		
		[].every.call(parentCollection,function(parentItem){			
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
			
		return resultList;
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
	
}(window));