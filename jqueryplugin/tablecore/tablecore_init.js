(function($){
	
	$.pluginManager.extend('tableCore',{
		init:init
	});
	
	function init(){
		var $container=this.eq(0),
			data=arguments[0].data,
			
			dataSize=data.length,
			pageSize=$container.find('>table>tbody>tr').length,
			pageCount=Math.ceil(dataSize/pageSize),
			pageIndex=0;
		
		$container
			.addClass('thzt_tablecore')
			.bindTemplate('setData',{
				data:$container.tableCore('tool').getRenderData(data,pageIndex*pageSize,(pageIndex+1)*pageSize)
			})
			.delegate('>div:last-child>span[data-page]','click',function(e){
				e.stopPropagation();
				
				var $span=$(this);				
				handlePageClickEvent.call($span);
			})
			.delegate('>table>thead>tr>th[data-sort]','click',function(e){
				e.stopPropagation();
				
				var $th=$(this),
					columnIndex=$th.index();
					
				$container.tableCore('sort',columnIndex);
			})
			.data('thzt_tablecore_data',{
				data:data,
				pageSize:pageSize,
				pageCount:pageCount,
				pageIndex:pageIndex
			})			
			.find('>div:last-child').html(getPageButtonHtml.call($container,pageCount)).end()
			.find('>table>thead>tr>th[data-sort]').addClass('thzt_tablecore_sort_init').end()
			.tableCore('tool').setPageButtonStyle.call($container)
			.show();
					
		return this;
	}
	
	function handlePageClickEvent(){
		var $span=$(this),
			$container=$span.parent('div').parent('div'),
			
			tableData=$container.data('thzt_tablecore_data'),			
			pageIndex=tableData.pageIndex,
			pageCount=tableData.pageCount,
			
			command=$span.attr('data-page');
			
		switch(command){
			case 'previous':
				pageIndex!==0&&(pageIndex--);
				break;
			case 'next':
				pageIndex!==pageCount-1&&(pageIndex++);
				break;
			default:
				pageIndex!==+command&&(pageIndex=+command);
		}
		
		$container
			.tableCore('page',pageIndex)
			.tableCore('tool').setPageButtonStyle.call($container);
	}
	
	function getPageButtonHtml(pageCount){
		var $container=this.eq(0);
		
		return '<span>共'+pageCount+'页</span>\
			<span data-page="previous">上一页</span>\
			'+$container.tableCore('tool').timesReduce(pageCount,function(index,memo){
				return memo+'<span '+(index===0&&'class="thzt_tablecore_currentpage"')+' data-page="'+index+'">'+(index+1)+'</span> ';
			},'')+'\
			<span data-page="next">下一页</span>';
	}
	
}(jQuery));