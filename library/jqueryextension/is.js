//use:
//$.prototype.find

(function($){
	
	$.prototype.extend({
		is:isSatisfied
	});
	
	function isSatisfied(selector){
		var $elements=this,
			selectors=selector.split(','),
			isValid=false;
			
		[].every.call(selectors,function(item){
			var $result=$elements.filter(item);
			
			if($result.length!==0){
				isValid=true;
				return false;
			}
			
			return true;
		});
		
		return isValid;
	}
	
}(jQuery));