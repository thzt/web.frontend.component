(function($){
	
	$.prototype.extend({
		each:each
	});
	
	function each(callback){
		var $elements=this;
				
		[].every.call($elements,function(v){
			return callback.call(v);
		});
		
		return this;
	}
}(jQuery));