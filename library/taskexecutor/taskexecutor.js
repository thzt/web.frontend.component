(function(global){
	global.taskExecutor={
		create:function(){
			var interval=arguments[0].interval;
			return new TaskExecutor(interval);
		}
	};

	function TaskExecutor(interval){
		var executor=this;
				
		executor.interval=interval;
		executor.timer=null;
		
		executor.value=null;
		executor.task=null;

		return executor;
	}

	TaskExecutor.prototype={
		constructor:TaskExecutor,
		begin:function(initialValue,task){
			var executor=this;
						
			task(initialValue,function(nextValue){
				executor.value=nextValue;
				executor.task=task;
			
				executor.timer=setTimeout(function(){
					executor.begin.call(executor,nextValue,task);
				},executor.interval);
			});
		},
		stop:function(){
			var executor=this;
			
			if(executor.timer==null){
				return;
			}
			
			global.clearTimeout(executor.timer);
			
			executor.timer=null;
			executor.value=null;
			executor.task=null;
		},
		pause:function(){
			var executor=this;
			
			if(executor.timer==null){
				return;
			}
			
			global.clearTimeout(executor.timer);
			
			executor.timer=null;
		},
		resume:function(){
			var executor=this;
			executor.begin.call(executor,executor.value,executor.task);
		}
	};
}(this));