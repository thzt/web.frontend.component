(function($){
	$.pluginManager.extend('supportTrample',{
		init:init
	});
	
	function init(){
		var container=this.eq(0),
			click=arguments[0].click,
			
			ORIGIN=0,
			SUPPORT=1,
			TRAMPLE=-1;
		
		container.addClass('thzt_supporttrample');
		
		container.delegate('>div','click',function(e){
			e.stopPropagation();
		
			var div=$(this),
				supportDiv=container.find('>div:nth-child(1)'),
				supportNumberDiv=supportDiv.next('div'),
				trampleDiv=container.find('>div:nth-child(3)'),
				trampleNumberDiv=trampleDiv.next('div'),
			
				divIndex=div.index(),
				
				isClickSupport=divIndex===0||divIndex===1,
				isClickTrample=!isClickSupport,
				isSupported=supportDiv.hasClass('supported'),
				isTrampled=trampleDiv.hasClass('trampled');
				
//1. is supported
				
			//1.1 click support: cancel support
			if(isSupported&&isClickSupport){
				supportNumberDiv.html(+supportNumberDiv.html()-1);
				supportDiv.removeClass('supported');
				click(ORIGIN);
				return;
			}
			
			//1.2 click trample: trample
			if(isSupported&&isClickTrample){
				supportNumberDiv.html(+supportNumberDiv.html()-1);
				trampleNumberDiv.html(+trampleNumberDiv.html()+1);
				supportDiv.removeClass('supported');
				trampleDiv.addClass('trampled');
				click(TRAMPLE);
				return;
			}
			
//2. is trampled
			
			//2.1 click support: support
			if(isTrampled&&isClickSupport){
				supportNumberDiv.html(+supportNumberDiv.html()+1);
				trampleNumberDiv.html(+trampleNumberDiv.html()-1);
				supportDiv.addClass('supported');
				trampleDiv.removeClass('trampled');
				click(SUPPORT);
				return;
			}
			
			//2.2 click trample: cancel trample
			if(isTrampled&&isClickTrample){
				trampleNumberDiv.html(+trampleNumberDiv.html()-1);
				trampleDiv.removeClass('trampled');
				click(ORIGIN);
				return;
			}
			
//3. otherwise: not supported and not trampled
			
			//3.1 click support: support
			if(isClickSupport){
				supportNumberDiv.html(+supportNumberDiv.html()+1);
				supportDiv.addClass('supported');
				click(SUPPORT);
				return;
			}
			
			//3.2 click trample: trample
			trampleNumberDiv.html(+trampleNumberDiv.html()+1);
			trampleDiv.addClass('trampled');
			click(TRAMPLE);
		});
		
		return this;
	}
}(jQuery));