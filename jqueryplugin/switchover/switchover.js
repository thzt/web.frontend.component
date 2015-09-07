//use:
//$.fn.delegate

(function($){
    
    $.pluginManager.extend('switchOver',{
	init:init
    });
    
    function init(){
	var $container=this,
	    selector=arguments[0].selector,

	    start=arguments[0].start,
	    progress=arguments[0].progress,
	    success=arguments[0].success;
	
	(function(){
	    var startPos;
	    
	    $container.delegate(selector,'touchstart',function(e){
		var htmlElement=this;

		//trick: orelse, android phone can't trigger touchend event.
		e.preventDefault();
		
		startPos=getPosition(e);
		start&&start.apply(htmlElement);
	    });
	    $container.delegate(selector,'touchmove',function(e){
		var htmlElement=this,
		    delta=getDeltaPosition(startPos,getPosition(e));
						
		progress&&progress.apply(htmlElement,delta);
	    });
	    $container.delegate(selector,'touchend',function(e){
		var htmlElement=this,				
		    delta=getDeltaPosition(startPos,getPosition(e));
		
		success&&success.apply(htmlElement,delta);
	    });
	}());
	
	return this;
    }
    
    //[x,y]
    function getPosition(e){
	var touches=e.originalEvent.changedTouches,
	    touch=touches[0];
	
	return [touch.clientX,touch.clientY];
    }
    
    function getDeltaPosition(startPos,endPos){
	return [endPos[0]-startPos[0],endPos[1]-startPos[1]];
    }
    
}(jQuery));
