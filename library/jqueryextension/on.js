(function($){
	
	$.prototype.extend({
		on:bindEvent
	});
	
	function bindEvent(eventName,eventHandler){
		var $elements=this;
		
		$elements.each(function(){
			var htmlButton=this;
			
			htmlButton.addEventListener(eventName,function(){
				eventHandler.call(htmlButton);
			},false);
		});
		
		return this;
	}
}(jQuery));