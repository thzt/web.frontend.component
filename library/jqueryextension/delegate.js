(function($){
	
	$.prototype.extend({
		delegate:delegate
	});
	
	function delegate(selector,eventName,eventHandler){
		var $elements=this;
			
		$elements.each(function(){
			var htmlElement=this,
				$targetElements=$(htmlElement).find(selector);
			
			htmlElement.addEventListener(eventName,function(e){
				var targetElement=e.target,
					isContain=[].some.call($targetElements,function(current){
						return current===targetElement;
					});
					
				if(!isContain){
					return;
				}
				
				eventHandler.call(targetElement);
			},false);
		});
		
		return this;
	}
	
}(jQuery));