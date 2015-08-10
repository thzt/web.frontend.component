(function($){
	
	$.pluginManager.extend('tableCore',{
		sort:sort
	});
	
	function sort(columnIndex){
		var $container=this.eq(0),
			
			tableData=$container.data('thzt_tablecore_data'),			
			pageIndex=0,
			pageCount=tableData.pageCount,
			pageSize=tableData.pageSize,
			data=tableData.data,
			
			$th=$container.find('>table>thead>tr>th').eq(columnIndex);
			
		$th.siblings('th[data-sort]')
			.removeClass('thzt_tablecore_sort_ascend thzt_tablecore_sort_descend')
			.addClass('thzt_tablecore_sort_init');
			
		switch(true){
			case $th.hasClass('thzt_tablecore_sort_init'):
			case $th.hasClass('thzt_tablecore_sort_descend'):
				data.sort(function(v1,v2){
					return v1[columnIndex]>v2[columnIndex];
				});
				$th.removeClass('thzt_tablecore_sort_init thzt_tablecore_sort_descend')
					.addClass('thzt_tablecore_sort_ascend');
				break;
			
			case $th.hasClass('thzt_tablecore_sort_ascend'):
				data.sort(function(v1,v2){
					return v1[columnIndex]<v2[columnIndex];
				});
				$th.removeClass('thzt_tablecore_sort_ascend')
					.addClass('thzt_tablecore_sort_descend');
				break;
		}
		
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