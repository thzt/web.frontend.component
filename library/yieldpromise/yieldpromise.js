(function(global){

	global.yieldPromise=yieldPromise;

	function yieldPromise(generator){
		var iterator=generator();

		recursiveCore.call(iterator);
	}

	function recursiveCore(feedback){
		var iterator=this,
			result=iterator.next(feedback);

		if(result.done){
			return;
		}

		var promise=result.value;
		Promise.resolve(promise).then(function(v){
			recursiveCore.call(iterator,v);
		});
	}
	
}(window));
