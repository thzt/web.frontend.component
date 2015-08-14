(function($){
	
	$.pluginManager.extend('tablePage',{
		init:init,
		setPageCount:setPageCount
	});
	
	function init(){
		var $container=this.eq(0),
			pageCount=arguments[0].pageCount,
			pageMaxCount=arguments[0].pageMaxCount,
			click=arguments[0].click,
			
			html='<span>共'+pageCount+'页</span>'
				+'<span data-page="previous">上一页</span>'
				+timesReduce(Math.min(pageCount,pageMaxCount),function(i,memo){
					return memo+'<span '+(i===0&&'class="thzt_tablepage_currentpage"')+' data-page="'+i+'" data-page-index>'+(i+1)+'</span>'
				},'')
				+'<span data-page="next">下一页</span>';
				
		$container
			.addClass('thzt_tablepage')
			.data('thzt_tablepage_data',{
				pageCount:pageCount,
				pageIndex:0
			})
			.html(html)
			.delegate('>span[data-page]','click',function(e){
				e.stopPropagation();
				
				var $span=$(this);				
				handlePageClickEvent.call($span,click);
			});
	}
	
	function setPageCount(){
		var $container=this.eq(0),
			pageCount=arguments[0].pageCount,
			pageMaxCount=arguments[0].pageMaxCount,
			
			html='<span>共'+pageCount+'页</span>'
				+'<span data-page="previous">上一页</span>'
				+timesReduce(Math.min(pageCount,pageMaxCount),function(i,memo){
					return memo+'<span '+(i===0&&'class="thzt_tablepage_currentpage"')+' data-page="'+i+'" data-page-index>'+(i+1)+'</span>'
				},'')
				+'<span data-page="next">下一页</span>';
				
		$container
			.html(html)
			.data('thzt_tablepage_data',{
				pageCount:pageCount,
				pageIndex:0
			});
		return this;
	}
	
	function handlePageClickEvent(click){
		var $span=this,
			$container=$span.closest('div'),
		
			page=$span.attr('data-page'),
			tablePageData=$container.data('thzt_tablepage_data'),
			pageIndex=tablePageData.pageIndex,
			pageCount=tablePageData.pageCount;
			
		switch(page){
			case 'previous':
				return pageIndex!==0
					&&handlePagePreviousEvent.call($container,--pageIndex,pageCount,click);
				
			case 'next':
				return pageIndex!==pageCount-1
					&&handlePageNextEvent.call($container,++pageIndex,pageCount,click);
				
			default:
				return handlePageIndexEvent.call($container,+page,pageCount,click);
		}
	}
	
	function handlePageIndexEvent(pageIndex,pageCount,click){
		var $container=this,
			$span=$container.find('>span[data-page-index]').filter(function(){
				var $current=$(this),
					dataPage=+$current.attr('data-page');
					
				return dataPage===pageIndex;
			});
			
		click(pageIndex,function(){
			$span
				.addClass('thzt_tablepage_currentpage')
				.siblings('.thzt_tablepage_currentpage')
				.removeClass('thzt_tablepage_currentpage');
				
			$container.data('thzt_tablepage_data',{
				pageCount:pageCount,
				pageIndex:pageIndex
			});
		});
	}
	
	function handlePagePreviousEvent(pageIndex,pageCount,click){
		var $container=this,
			haveNoPage=$container.find('>span[data-page-index]').length===0;
			
		if(haveNoPage){
			return;
		}
		
		click(pageIndex,function(){
			var $minPageSpan=$container.find('>span[data-page-index]').eq(0),
				showingMinPageIndex=+$minPageSpan.attr('data-page');
				
			if(pageIndex>=showingMinPageIndex){
				$container.find('.thzt_tablepage_currentpage')
					.prev('span')
					.addClass('thzt_tablepage_currentpage')
					.siblings('.thzt_tablepage_currentpage')
					.removeClass('thzt_tablepage_currentpage');
					
				$container.data('thzt_tablepage_data',{
					pageCount:pageCount,
					pageIndex:pageIndex
				})
					
				return;
			}
			
			$container.find('>span[data-page-index]').each(function(){
				var $currentSpan=$(this),
					currentPageIndex=+$currentSpan.attr('data-page');
					
				$currentSpan
					.attr('data-page',currentPageIndex-1)
					.html(currentPageIndex);
			});
			
			$minPageSpan
				.addClass('thzt_tablepage_currentpage')
				.siblings('.thzt_tablepage_currentpage')
				.removeClass('thzt_tablepage_currentpage');
				
			$container.data('thzt_tablepage_data',{
				pageCount:pageCount,
				pageIndex:pageIndex
			});
		});
	}
	
	function handlePageNextEvent(pageIndex,pageCount,click){
		var $container=this,
			haveNoPage=$container.find('>span[data-page-index]').length===0;
			
		if(haveNoPage){
			return;
		}
		
		click(pageIndex,function(){
			var $maxPageSpan=$container.find('>span[data-page-index]').eq(-1),
				showingMaxPageIndex=+$maxPageSpan.attr('data-page');
				
			if(pageIndex<=showingMaxPageIndex){
				$container.find('.thzt_tablepage_currentpage')
					.next('span')
					.addClass('thzt_tablepage_currentpage')
					.siblings('.thzt_tablepage_currentpage')
					.removeClass('thzt_tablepage_currentpage');
					
				$container.data('thzt_tablepage_data',{
					pageCount:pageCount,
					pageIndex:pageIndex
				})
					
				return;
			}
			
			$container.find('>span[data-page-index]').each(function(){
				var $currentSpan=$(this),
					currentPageIndex=+$currentSpan.attr('data-page');
					
				$currentSpan
					.attr('data-page',currentPageIndex+1)
					.html(currentPageIndex+2);
			});
			
			$maxPageSpan
				.addClass('thzt_tablepage_currentpage')
				.siblings('.thzt_tablepage_currentpage')
				.removeClass('thzt_tablepage_currentpage');
				
			$container.data('thzt_tablepage_data',{
				pageCount:pageCount,
				pageIndex:pageIndex
			});
		});
	}
	
	function timesReduce(n,callback,initVal){
		var memo=initVal;
		
		for(var i=0;i<n;i++){
			memo=callback(i,memo);
		}
		
		return memo;
	}
	
}(jQuery));