(function(global){

	global.evalPropChain=evalPropChain;

	function evalPropChain(data,propChainStr){
		return new Function('obj','with(obj){return '+propChainStr+';}').call(null,data);
	}
	
}(window));
