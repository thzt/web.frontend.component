(function($){
	
	$.pluginManager.extend('expanding',{
		init:init,
		stop:stop
	});
	
	function init(){
		var $container=this,
			initRadius=arguments[0].initRadius,
			maxRadius=arguments[0].maxRadius,
			interval=arguments[0].interval,
			
			radius=arguments[0].radius,
			color=arguments[0].color,
			left=arguments[0].left,
			top=arguments[0].top;
			
		$container.addClass('thzt_expanding');
		
		$container.css({
			width:maxRadius,
			height:maxRadius,
			left:left-maxRadius/2,
			top:top-maxRadius/2
		});
		$container.find('>span:first-child').css({
			background: 'radial-gradient(\
				rgba(255,255,255,.0) 0%,\
				rgba('+color.join(',')+',.3) 60%,\
				rgba('+color.join(',')+',1) 80%)',
			borderRadius:maxRadius,
			left:maxRadius/2-initRadius/2,
			top:maxRadius/2-initRadius/2
		});
		$container.find('>span:last-child').css({
			background:'rgb('+color.join(',')+')',
			left:maxRadius/2,
			top:maxRadius/2
		});
		
		$container.find('>span:first-child').stop();
		loopAnimate.call($container,radius,interval,maxRadius,initRadius);
		return this;			
	}
	
	function stop(){
		var $container=this;
		
		$container.find('>span:first-child').stop();
		return this;
	}
	
	function loopAnimate(radius,interval,maxRadius,initRadius){
		var $container=this;
		
		$container.find('>span:first-child').css({
			width:initRadius,
			height:initRadius,
			left:maxRadius/2-initRadius/2,
			top:maxRadius/2-initRadius/2,
			opacity:1
		});
		
		$container.find('>span:first-child').animate({
			width:radius,
			height:radius,
			left:maxRadius/2-radius/2,
			top:maxRadius/2-radius/2
		},interval,function(){
			$container.find('>span:first-child').animate({
				opacity:0
			},500,function(){
				loopAnimate.call($container,radius,interval,maxRadius,initRadius);
			});
		});
	}
	
}(jQuery));