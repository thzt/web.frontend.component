(function($){
	
	$.pluginManager.extend('asyncTable',{
		init:init
	});
	
	function init(){
		var $container=this.eq(0),
			sort=arguments[0].sort;
		
		$container.addClass('thzt_asynctable')
			.find('>thead>tr>th[data-sort]')
			.addClass('thzt_asynctable_sort_init').end()
			.delegate('>thead>tr>th[data-sort]','click',function(e){
				e.stopPropagation();
				
				var $th=$(this);
				handleSortClickEvent.call($th,sort);
			});
			
		return this;
	}
	
	function handleSortClickEvent(sort){
		var $th=this,
			isAscend=$th.hasClass('thzt_asynctable_sort_init')
				||$th.hasClass('thzt_asynctable_sort_descend'),
				
			sortStatus={
				columnValue:$th.attr('data-value'),
				columnText:$th.html(),
				columnIndex:$th.index(),
				isAscend:isAscend
			};
				
		sort(sortStatus,function(){
			$th.siblings('th[data-sort]')
				.removeClass('thzt_asynctable_sort_ascend thzt_asynctable_sort_descend')
				.addClass('thzt_asynctable_sort_init');
				
			if(isAscend){
				$th
					.removeClass('thzt_asynctable_sort_init thzt_asynctable_sort_descend')
					.addClass('thzt_asynctable_sort_ascend');
					
				return;
			}
				
			$th
				.removeClass('thzt_asynctable_sort_init thzt_asynctable_sort_ascend')
				.addClass('thzt_asynctable_sort_descend');
		});
	}
	
}(jQuery));