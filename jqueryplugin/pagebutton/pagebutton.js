(function($){
	$.pluginManager.extend('pageButton',{
		init:init,
		bindEvent:bindEvent
	});
	
	function init(){
		var container=this.eq(0);
		
		container.addClass('thzt_pagebutton');		
		return this;
	}
	
	function bindEvent(){
		var container=this.eq(0),
			eventArray=[
				arguments[0].first,
				arguments[0].prev,
				arguments[0].start,
				arguments[0].next,
				arguments[0].last
			];
			
		container.delegate('>span','click',function(e){
			e.stopPropagation();
			
			var button=$(this),
				index=button.index();
				
			index==2    //start button
				?button.toggleClass('thzt_pagebutton_pause')
				:container.find('>span:nth-child(3)').removeClass().addClass('thzt_pagebutton_pause');
				
			eventArray[index].call(button,!button.hasClass('thzt_pagebutton_pause'));    //arguments[0]=isStart
		});
		
		return this;
	}
}(jQuery));