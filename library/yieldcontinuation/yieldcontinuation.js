(function(global){

	global.yieldContinuation=yieldContinuation;

	function yieldContinuation(generator){

		var iterator=generator(),
			yieldFunc=iterator.next().value,
			continuation=iterator.next.bind(iterator);

		yieldFunc(continuation);
	}
	
}(window));
