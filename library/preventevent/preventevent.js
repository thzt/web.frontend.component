(function(global){

	global.preventEvent=preventEvent;

	function preventEvent(opt){
		var lock=opt.lock,
			release=opt.release,
			event=opt.event,

			isLocked=false;

		return function(){
			var context=this;

			if(isLocked){
				return;
			}
			
			lock.call(context);
			isLocked=true;
			
			event.call(context,function(){
				release.call(context);
				isLocked=false;
			});
		};
	}
	
}(window));
