(function($){
	
	$.pluginManager.extend('asyncTable',{
		getSortStatus:getSortStatus,
		getPageSize:getPageSize
	});
	
	function getSortStatus(){
		var $container=this.eq(0),
			$ascendTh=$container.find('.thzt_asynctable_sort_ascend');
			
		if($ascendTh.length!==0){
			return {
				columnValue:$ascendTh.attr('data-value'),
				columnText:$ascendTh.html(),
				columnIndex:$ascendTh.index(),
				isAscend:true
			};
		}
		
		var $descendTh=$container.find('.thzt_asynctable_sort_descend');
		
		if($descendTh.length!==0){
			return {
				columnValue:$descendTh.attr('data-value'),
				columnText:$descendTh.html(),
				columnIndex:$descendTh.index(),
				isAscend:false
			};
		}
		
		return null;
	}
	
	function getPageSize(){
		var $container=this.eq(0),
			pageSize=$container.find('>tbody>tr').length;
			
		return pageSize;
	}
	
}(jQuery));