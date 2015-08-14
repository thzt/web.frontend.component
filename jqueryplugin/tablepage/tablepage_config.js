(function($){
	
	$.pluginManager.filter('tablePage',{
		init:filterInit,
		setPageCount:filterSetPageCount
	});
	
	function filterInit(){
		var pageCount=arguments[0].pageCount,
			pageMaxCount=arguments[0].pageMaxCount,
			click=arguments[0].click;
			
		return [{
			pageCount:pageCount,
			pageMaxCount:pageMaxCount||5,
			click:click
		}];
	}
	
	function filterSetPageCount(){
		var pageCount=arguments[0].pageCount,
			pageMaxCount=arguments[0].pageMaxCount;
			
		return [{
			pageCount:pageCount,
			pageMaxCount:pageMaxCount||5
		}];
	}
	
}(jQuery));