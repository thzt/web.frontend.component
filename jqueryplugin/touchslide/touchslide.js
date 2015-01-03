(function($){
	$.pluginManager.extend('touchSlide',{
		init:init
	});
	
	function init(){
		var container=this.eq(0),
		
			slideUp=arguments[0].slideUp
			
		container.addClass('thzt_touchslide');
		bindSlideEvent.call(container,slideUp);
		
		return this;
	}
	
	function bindSlideEvent(slideUp){
		var container=this,
		
			mousedownClientY,
			enableAddMore=false,
			SHORTEST_DISTANCE=150;
		
		$(document).bind('vmousedown',function(e){
			var isBottom=($(document).scrollTop()>=$(document).height()-$(window).height());
			
			mousedownClientY=e.clientY;
			enableAddMore=isBottom;
		});
	
		$(document).bind('vmousemove',function(e){
			if(!enableAddMore){
				return;
			}
			
			//avoid multiple trigger mousemove/vmousemove event.
			if(container.hasClass('thzt_touchslide_show_warning')){
				return;
			}
			
			var isSlideUpEffective=(mousedownClientY-e.clientY>SHORTEST_DISTANCE);

			if(!isSlideUpEffective){
				return;
			}
			
			container.addClass('thzt_touchslide_show_warning');
		});
		
		$(document).bind('vmouseup',function(e){
			if(!container.hasClass('thzt_touchslide_show_warning')){
				return;
			}
			
			container.removeClass('thzt_touchslide_show_warning');
			slideUp(unbindSlideEvent);
		});
	}
	
	function unbindSlideEvent(){
		$(document).unbind('vmousedown vmousemove vmouseup');
	}
}(jQuery));