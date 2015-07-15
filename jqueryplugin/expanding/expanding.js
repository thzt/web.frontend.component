(function($){
	
	$.pluginManager.extend('expanding',{
		init:init
	});
	
	function init(){
		var $container=this,
			maxRadius=arguments[0].maxRadius,
			color=arguments[0].color,
			radius=arguments[0].radius,
			interval=arguments[0].interval,
			left=arguments[0].left,
			top=arguments[0].top;
			
		$container.addClass('thzt_expanding');
		
		$container.css({
			width:maxRadius,
			height:maxRadius,
			left:left-maxRadius/2,
			top:top-maxRadius/2
		});
		$container.find('>div>span:first-child').css({
			background: 'radial-gradient(\
				rgba(255,255,255,.0) 0%,\
				rgba('+color.join(',')+',.3) 60%,\
				rgba('+color.join(',')+',1) 80%)',
			borderRadius:maxRadius
		});
		$container.find('>div>span:last-child').css({
			background:'rgb('+color.join(',')+')',
			left:maxRadius/2,
			top:maxRadius/2
		});
		
		loopAnimate.call($container,radius,interval);
		return this;			
	}
	
	function loopAnimate(radius,interval){
		var $container=this;
		
		$container.find('>div>span:first-child').css({
			width:30,
			height:30,
			opacity:1
		});
		
		animate({
			trigger:function(ratio){
				var width=(radius-30)*ratio+30,
					height=width;
					
				$container.find('>div>span:first-child').css({
					width:width,
					height:height
				});
			},
			complete:function(){
				
				animate({
					trigger:function(ratio){
						var opacity=1-ratio;
						
						$container.find('>div>span:first-child').css({
							opacity:opacity
						});
					},
					complete:function(){
						loopAnimate.call($container,radius,interval);
					},
					interval:500
				});
			},
			interval:interval
		});
		
		// jQuery.fn.animate will shake, so we write our onw animate funtion.
		/*
		$container.find('>div>span:first-child').animate({
			width:radius,
			height:radius
		},interval);
		
		$container.find('>div>span:first-child').animate({
			opacity:0
		},500,function(){
			loopAnimate.call($container,radius,interval);
		});
		*/
	}
	
	function animate(){
		var trigger=arguments[0].trigger,
			complete=arguments[0].complete,
			interval=arguments[0].interval,
			
			count=0,
			unit=50;
		
		var timer=setInterval(function(){
			count+=unit;
			
			var ratio=count/interval;			
			if(ratio>1){
				window.clearInterval(timer);
				complete();
				return;
			}
			
			var result=trigger(ratio);
			if(result===false){
				window.clearInterval(timer);
				complete();
				return;
			}
		},unit);
	}
	
}(jQuery));