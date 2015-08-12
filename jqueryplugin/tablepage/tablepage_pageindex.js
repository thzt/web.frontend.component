(function($){
	
	$.pluginManager.extend('tablePage',{
		getPageIndex:getPageIndex,
		setPageIndex:setPageIndex
	});
	
	function getPageIndex(){
		var $container=this.eq(0);
		
		return +$container
			.find('>span.thzt_tablepage_currentpage')
			.attr('data-page');
	}
	
	function setPageIndex(){
		var $container=this.eq(0),
			pageIndex=arguments[0].pageIndex,
			
			$minPageSpan=$container.find('>span[data-page-index]').eq(0),
			minPageIndex=+$minPageSpan.attr('data-page'),
			$maxPageSpan=$container.find('>span[data-page-index]').eq(-1),
			maxPageIndex=+$maxPageSpan.attr('data-page');
			
		$container.data('thzt_tablepage_data',{
			pageCount:$container.data('thzt_tablepage_data').pageCount,
			pageIndex:pageIndex
		});
		
		if(pageIndex>=minPageIndex&&pageIndex<=maxPageIndex){
			$container
				.find('>span[data-page-index]')
				.filter(function(){
					var $span=$(this),
						currentIndex=+$span.attr('data-page');
						
					return  currentIndex===pageIndex;
				})
				.addClass('thzt_tablepage_currentpage')
				.siblings('span[data-page-index]')
				.removeClass('thzt_tablepage_currentpage');
				
			return this;
		}
			
		if(pageIndex<minPageIndex){
			(function(currentPageIndex){
				$container
					.find('>span[data-page-index]')
					.each(function(){
						var $span=$(this);				
						$span.attr('data-page',currentPageIndex)
							.html(currentPageIndex+1);
							
						currentPageIndex++;	
					})
					.removeClass('thzt_tablepage_currentpage')
					.eq(0).addClass('thzt_tablepage_currentpage');
			}(pageIndex));
			
			return this;
		}
		
		(function(pageIndex){
			var $pageSpan=$container.find('>span[data-page-index]'),
				pageSpanCount=$pageSpan.length;
				
			$pageSpan
				.each(function(index){
					var $span=$(this),
						spanPageIndex=pageIndex-pageSpanCount+index+1;
					
					$span.attr('data-page',spanPageIndex)
						.html(spanPageIndex+1);
				})
				.removeClass('thzt_tablepage_currentpage')
				.filter(function(){
					var $current=$(this),
						currentPageIndex=+$current.attr('data-page');
						
					return currentPageIndex===pageIndex;
				})
				.addClass('thzt_tablepage_currentpage');
		}(pageIndex));
			
		return this;
	}
	
}(jQuery));