(function($,global){
	
	$.pluginManager.extend('randomRotate',{
		init:init,
		begin:begin,
		stop:stop,
		isRunning:isRunning
	});
	
	var Timer=global.Timer;
	
	function init(){
		var $container=this,
			velocity=arguments[0].velocity,
			interval=arguments[0].interval,
			
			timer1=createTimer1.call($container,velocity,interval),
			timer2=createTimer2.call($container,velocity,interval);
			
		$container.data('thzt_randomrotate_timers',[timer1,timer2]);
		return this;
	}
	
	function begin(){
		var $container=this,
		
			timers=$container.data('thzt_randomrotate_timers'),
			timer1=timers[0],
			timer2=timers[1],
			
			isTimer1Running=timer1.isRunning(),
			isTimer2Running=timer2.isRunning();
				
		if(isTimer1Running||isTimer2Running){
			return this;
		}
			
		$container.data('thzt_randomrotate_init_degree',0);	
		timer1.begin();				
		return this;				
	}
	
	function stop(){
		var $container=this,
			degree=arguments[0].degree,
		
			timers=$container.data('thzt_randomrotate_timers'),
			timer1=timers[0],
			timer2=timers[1],
			
			isTimer1Running=timer1.isRunning(),
			isTimer2Running=timer2.isRunning();
			
		//all timer stop, do nothing
		if(!isTimer1Running&&!isTimer2Running){
			return this;
		}
		
		//already set timer2 stop, do nothing
		if(isTimer2Running){
			return this;
		}
		
		$container.data('thzt_randomrotate_final_degree',degree);
			
		timer1.stop();
		timer2.begin();
		
		return this;
	}
	
	function isRunning(){
		var $container=this,
		
			timers=$container.data('thzt_randomrotate_timers'),
			timer1=timers[0],
			timer2=timers[1],
			
			isTimer1Running=timer1.isRunning(),
			isTimer2Running=timer2.isRunning(),
			
			isRunning=isTimer1Running||isTimer2Running;
			
		return isRunning;
	}
	
	//private region
	
	function createTimer1(velocity,interval){
		var $container=this,
			timer1=new Timer({
				interval:interval,
				tick:function(t){
					var deg1=velocity*t;
					
					$container.data('thzt_randomrotate_init_degree',deg1);					
					$container.css({
						transform:'rotate('+deg1+'deg)'
					});
				}
			});
		
		return timer1;
	}
	
	function createTimer2(velocity,interval){
		var $container=this,
			timer2=new Timer({
				interval:interval,
				tick:function(t){
					var initDegree=$container.data('thzt_randomrotate_init_degree'),
						finalDegree=$container.data('thzt_randomrotate_final_degree'),
					
						loopCount=getNearestCeilNumber(initDegree/360),									
						totalDegree=(loopCount+1)*360+finalDegree,
						a2=-velocity*velocity/(2*(totalDegree-initDegree)),    //vt^2-v0^2=2*a*s => a=(vt^2-v0^2)/(2*s)
						v2=velocity+a2*t,    //v=v0+a*t
						deg2=initDegree+velocity*t+0.5*a2*t*t;    //s=s0+v0*t+0.5*a*t^2
						
					$container.css({
						transform:'rotate('+deg2+'deg)'
					});
										
					if(v2<=0){
						return false;
					}
				}
			});
			
		return timer2;
	}
	
	function getNearestCeilNumber(float){
		var ceil=Math.ceil(float);
		
		if(ceil===float){
			return float+1;
		}
		
		return ceil;
	}
	
}(jQuery,window));