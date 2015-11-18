(function(global){

	global.lazyTriggerEventAssistant={
		create:function(){
			var task=arguments[0].task;
			
			return new LazyTriggerEventAssistant(task);
		}
	};

	function LazyTriggerEventAssistant(task){
		var instance=this;
		
		instance.task=task;
		instance.isBusy=false;

		return this;
	}

	LazyTriggerEventAssistant.prototype={
		constructor:LazyTriggerEventAssistant,

		execute:function(value){
			var instance=this,

				task=instance.task,
				isBusy=instance.isBusy;

			if(isBusy){
				return this;
			}

			instance.isBusy=true;
			
			task(value,function(){
				instance.isBusy=false;
			});

			return this;
		}
	};
	
}(window));
