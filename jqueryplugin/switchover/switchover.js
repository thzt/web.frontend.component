//use:
//$.fn.delegate

(function($){
	
	$.pluginManager.extend('switchOver',{
		init:init
	});
	
	function init(){
		var $container=this,
			selector=arguments[0].selector,
			success=arguments[0].success;
		
		(function(){
			var startX,startY;
		
			$container.delegate(selector,'touchstart',function(e){
				startX=e.originalEvent.changedTouches[0].clientX;
				startY=e.originalEvent.changedTouches[0].clientY;
			});
			$container.delegate(selector,'touchmove',function(e){
				e.preventDefault();
			});
			$container.delegate(selector,'touchend',function(e){
				var endX=e.originalEvent.changedTouches[0].clientX,
					endY=e.originalEvent.changedTouches[0].clientY,
					
					deltaX=endX-startX,
					deltaY=endY-startY;
				
				success.call(null,deltaX,deltaY);
			});
		}());
		
		return this;
	}
		
}(jQuery));