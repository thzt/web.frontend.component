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
				data:getRenderData(data,pageIndex*pageSize,(pageIndex+1)*pageSize)
			})
			.delegate('>div:last-child>span[data-page]','click',function(e){
				e.stopPropagation();
				
				var $span=$(this);				
				handlePageClickEvent.call($span);
			})
			.delegate('>table>thead>tr>th[data-sort]','click',function(e){
				e.stopPropagation();
				
				var $th=$(this);				
				handleTitleClickEvent.call($th);
			})
			.data('thzt_tablecore_data',{
				data:data,
				pageSize:pageSize,
				pageCount:pageCount,
				pageIndex:pageIndex
			})			
			.find('>div:last-child').html(getPageButtonHtml(pageCount)).end()
			.find('>table>thead>tr>th[data-sort]').addClass('thzt_tablecore_sort_init').end();
			
		setCurrentPageStyle.call($container);			
		return this;
	}
	
	function handlePageClickEvent(){
		var $span=$(this),
			$container=$span.parent('div').parent('div'),
			
			tableData=$container.data('thzt_tablecore_data'),			
			pageIndex=tableData.pageIndex,
			pageCount=tableData.pageCount,
			pageSize=tableData.pageSize,
			data=tableData.data,
			
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
			.bindTemplate('setData',{
				data:getRenderData(data,pageIndex*pageSize,(pageIndex+1)*pageSize)
			})
			.data('thzt_tablecore_data',{
				data:data,
				pageSize:pageSize,
				pageCount:pageCount,
				pageIndex:pageIndex
			});
			
		setCurrentPageStyle.call($container);
	}
	
	function handleTitleClickEvent(){
		var $th=$(this),
			$container=$th.closest('div'),
			
			tableData=$container.data('thzt_tablecore_data'),			
			pageIndex=0,
			pageCount=tableData.pageCount,
			pageSize=tableData.pageSize,
			data=tableData.data,
			
			thIndex=$th.index();
			
		$th.siblings('th[data-sort]')
			.removeClass('thzt_tablecore_sort_ascend thzt_tablecore_sort_descend')
			.addClass('thzt_tablecore_sort_init');
			
		switch(true){
			case $th.hasClass('thzt_tablecore_sort_init'):
			case $th.hasClass('thzt_tablecore_sort_descend'):
				data.sort(function(v1,v2){
					return v1[thIndex]>v2[thIndex];
				});
				$th.removeClass('thzt_tablecore_sort_init thzt_tablecore_sort_descend')
					.addClass('thzt_tablecore_sort_ascend');
				break;
			
			case $th.hasClass('thzt_tablecore_sort_ascend'):
				data.sort(function(v1,v2){
					return v1[thIndex]<v2[thIndex];
				});
				$th.removeClass('thzt_tablecore_sort_ascend')
					.addClass('thzt_tablecore_sort_descend');
				break;
		}
		
		$container
			.bindTemplate('setData',{
				data:getRenderData(data,pageIndex*pageSize,(pageIndex+1)*pageSize)
			})
			.data('thzt_tablecore_data',{
				data:data,
				pageSize:pageSize,
				pageCount:pageCount,
				pageIndex:pageIndex
			});
			
		setCurrentPageStyle.call($container);
	}
	
	function setCurrentPageStyle(){
		var $container=this,
		
			tableData=$container.data('thzt_tablecore_data'),			
			pageIndex=tableData.pageIndex;
			
		$container
			.find('>div:last-child>span[data-page]')
			.removeClass('thzt_tablecore_currentpage')
			.eq(pageIndex+1)
			.addClass('thzt_tablecore_currentpage');
			
		return this;
	}
	
	function timesReduce(n,callback,initVal){
		var memo=initVal;
		
		for(var i=0;i<n;i++){
			memo=callback(i,memo);
		}
		
		return memo;
	}
	
	function getPageButtonHtml(pageCount){
		return '<span>共'+pageCount+'页</span>\
			<span data-page="previous">上一页</span>\
			'+timesReduce(pageCount,function(index,memo){
				return memo+'<span '+(index===0&&'class="thzt_tablecore_currentpage"')+' data-page="'+index+'">'+(index+1)+'</span> ';
			},'')+'\
			<span data-page="next">下一页</span>';
	}
	
	function getRenderData(data,index,size){		
		var renderData=data.slice(index,size),
			remainderCount=size-renderData.length;
			
		return timesReduce(remainderCount,function(index,memo){
			memo.push([]);
			
			return memo;
		},renderData);
	}
	
}(jQuery));