//use: 
//$.prototype.search
//$.prototype.on

(function($){
	
	$.prototype.extend({
		delegate:delegate,
		undelegate:undelegate
	});
	
	function delegate(selector,eventName,eventHandler){
		var $elements=this,
			$targetElements=$elements.search(selector);
		
		$elements.on(eventName,function(e){
			var targetElement=e.target,
				isContain=[].some.call($targetElements,function(current){
					return current===targetElement;
				});
				
			if(!isContain){
				return;
			}
			
			eventHandler.call(targetElement);
		});
				
		return this;
	}
	
	function undelegate(eventName){
		var $elements=this;
			
		$elements.off(eventName);		
		return this;
	}
	
}(jQuery));