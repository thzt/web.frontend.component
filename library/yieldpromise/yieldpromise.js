(function(global){

	global.yieldPromise=yieldPromise;

	function yieldPromise(generator){
		var iterator=generator();

		recusiveCore.call(iterator);
	}

	function recusiveCore(feedback){
		var iterator=this,
			result=iterator.next(feedback);

		if(result.done){
			return;
		}

		var promise=result.value;
		Promise.resolve(promise).then(function(v){
			recusiveCore.call(iterator,v);
		});
	}
	
}(window));
