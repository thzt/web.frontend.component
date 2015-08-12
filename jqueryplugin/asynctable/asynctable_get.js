(function($){
	
	$.pluginManager.extend('asyncTable',{
		getSortStatus:getSortStatus
	});
	
	function getSortStatus(){
		var $container=this.eq(0),
			$ascendTh=$container.find('.thzt_asynctable_sort_ascend');
			
		if($ascendTh.length!==0){
			return {
				columnIndex:$ascendTh.index(),
				isAscend:true
			};
		}
		
		var $descendTh=$container.find('.thzt_asynctable_sort_descend');
		
		if($descendTh.length!==0){
			return {
				columnIndex:$descendTh.index(),
				isAscend:false
			};
		}
		
		return null;
	}
	
}(jQuery));