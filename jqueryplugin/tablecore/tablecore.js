(function($){
	
	$.pluginManager.extend('tableCore',{
		init:init
	});
	
	function init(){
		var $container=this.eq(0),
			data=arguments[0].data,
			
			dataSize=data.length,
			pageSize=$container.find('>table>tbody>tr').length,
			pageCount=Math.ceil(dataSize/pageSize);
		
		$container
			.addClass('thzt_tablecore')
			.bindTemplate('setData',{
				data:data
			})
			.delegate('>div:last-child>span[data-page]','click',function(e){
				e.stopPropagation();
				
				var $span=$(this);				
				handlePageClickEvent.call($span,pageSize,pageCount,data);
			})
			.data('thzt_tablecore_page_index',0)			
			.find('>div:last-child').html(getPageButtonHtml(pageCount))
			
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
				return memo+'<span  data-page="'+index+'">'+(index+1)+'</span>';
			},'')+'\
			<span data-page="next">下一页</span>';
	}
	
	function handlePageClickEvent(pageSize,pageCount,data){
		var $span=$(this),
			$container=$span.parent('div').parent('div'),
			
			command=$span.attr('data-page'),
			pageIndex=$container.data('thzt_tablecore_page_index');
			
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
			.data('thzt_tablecore_page_index',pageIndex);
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