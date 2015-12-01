(function($){

	$.interaction=interaction;

	function interaction(){
		var parameter=arguments[0].parameter,
			handler=arguments[0].handler,
			method=arguments[0].method;

		return method(parameter,handler);
	}
	
}(jQuery));
