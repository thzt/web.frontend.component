(function($){
	
	$.prototype.extend({
		delegate:delegate,
		undelegate:undelegate
	});
	
	function delegate(selector,eventName,eventHandler){
		var $elements=this;
			
		$elements.each(function(){
			var htmlElement=this,
				$targetElements=$(htmlElement).find(selector),
				
				handler=function(e){
					var targetElement=e.target,
						isContain=[].some.call($targetElements,function(current){
							return current===targetElement;
						});
						
					if(!isContain){
						return;
					}
					
					eventHandler.call(targetElement);
				};
								
			htmlElement.addEventListener(eventName,handler,false);
			$(htmlElement).data(eventName,handler);
		});
				
		return this;
	}
	
	function undelegate(eventName){
		var $elements=this,
			eventHandler=$elements.data(eventName);
			
		$elements.each(function(){
			var htmlElement=this;
			
			htmlElement.removeEventListener(eventName,eventHandler,false);
		});
		
		return this;
	}
	
}(jQuery));