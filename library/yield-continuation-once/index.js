(function(global){

	global.yieldContinuationOnce=yieldContinuationOnce;

	function yieldContinuationOnce(generator){

		var iterator=generator(),
			yieldFunc=iterator.next().value,
			continuation=iterator.next.bind(iterator);

		yieldFunc(continuation);
	}
	
}(window));
