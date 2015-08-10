(function(global){
	
	//export
	global.Timer=Timer;
		
	//private region
	function Timer(){
		var instance=this;
				
		instance.interval=arguments[0].interval;
		instance.tick=arguments[0].tick;
		instance.timer=null;
	}
	
	Timer.prototype={
		begin:function(){
			var instance=this,
				totolTime=0,
				
				interrupt=arguments[0]&&arguments[0].interrupt;
				
			instance.timer=setInterval(function(){
				var result=instance.tick(++totolTime);
				
				if(result!==false){
					return;
				}
				
				global.clearInterval(instance.timer);
				instance.timer=null;
				
				interrupt&&interrupt(totolTime);				
			},instance.interval);
			
			return this;
		},
		stop:function(){
			var instance=this;
			
			global.clearInterval(instance.timer);
			instance.timer=null;
			return this;
		},
		isRunning:function(){
			var instance=this;
			
			return instance.timer!=null;
		}
	};
}(window));