(function(global){

	global.yieldContinuation=yieldContinuation;

	function yieldContinuation(generator){
		var iterator=generator();

		recursiveCore.call(iterator);
	}

	function recursiveCore(feedback){
		var iterator=this,
			result=iterator.next(feedback);

		if(result.done){
			return;
		}

		var yieldFunc=result.value;
		yieldFunc(function(v){
			recursiveCore.call(iterator,v);
		});
	}
	
}(window));
