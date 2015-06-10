(function($){
	
	$.pluginManager.extend('slideMenu',{
		init:init,
		open:openMenu,
		close:closeMenu,
		resetHeight:resetHeight
	});
	
	function init(){
		var $container=this.eq(0);
		
		$container.addClass('thzt_slidemenu');
		resetHeight.call($container);
		
		$container.delegate('>div:nth-child(3)','click',function(e){
			e.stopPropagation();
			
			$container.slideMenu('close');
		});
		
		return this;
	}
	
	function openMenu(){
		var $container=this.eq(0);
		
		$container.find('>div:nth-child(2)').css({
			left:'0px'
		});
		
		$container.find('>div:nth-child(3)').show();
		
		return this;
	}
	
	function closeMenu(){
		var $container=this.eq(0),
			slideWidth=+$container.find('>div:nth-child(2)').css('width').slice(0,-2);
		
		$container.find('>div:nth-child(2)').css({
			left:-slideWidth+'px'
		});
		
		$container.find('>div:nth-child(3)').hide();
		
		return this;
	}
	
	function resetHeight(){
		var $container=this,
		
			screenHeight=$(document).height(),
			bodyHeight=+$('body').css('height').slice(0,-2),
			containerHeight=Math.max(screenHeight,bodyHeight)+'px';
			
		$container.css({
			height:containerHeight
		});
		
		return this;
	}
	
}(jQuery));