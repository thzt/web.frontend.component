(function($){
	
	$.pluginManager.extend('tableCore',{
		page:page
	});
	
	function page(pageIndex){
		var $container=this.eq(0),
		
			tableData=$container.data('thzt_tablecore_data'),
			pageCount=tableData.pageCount,
			pageSize=tableData.pageSize,
			data=tableData.data;
		
		$container
			.bindTemplate('setData',{
				data:$container.tableCore('tool').getRenderData(data,pageIndex*pageSize,(pageIndex+1)*pageSize)
			})
			.data('thzt_tablecore_data',{
				data:data,
				pageSize:pageSize,
				pageCount:pageCount,
				pageIndex:pageIndex
			})
			.tableCore('tool').setPageButtonStyle.call($container);
			
		return this;
	}
	
}(jQuery));