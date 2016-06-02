(function(global){

	global.preventEvent=preventEvent;

	function preventEvent(opt){
		var lock=opt.lock,
			release=opt.release,
			event=opt.event;

		return function(){
			var context=this;
			
			lock.call(context);
			event.call(context,release.bind(context));
		};
	}
	
}(window));
