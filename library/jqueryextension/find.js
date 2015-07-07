(function($,global){
	
	//import
	var findAll=global.findAll;
	
	//private region
	
	$.prototype.extend({
		find:find
	});
	
	function find(selector){
		var $elements=this,
			findELements=findAll.call($elements,selector);
		
		return $(findELements);
	}
	
}(jQuery,window));