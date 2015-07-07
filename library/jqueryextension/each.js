(function($){
	
	$.prototype.extend({
		each:each
	});
	
	function each(callback){
		var $elements=this;
		
		[].forEach.call($elements,function(v){
			callback.call(v);
		});
		
		return this;
	}
}(jQuery));