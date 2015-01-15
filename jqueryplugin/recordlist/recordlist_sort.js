(function($,_){
	$.pluginManager.extend('recordList',{
		sort:sort
	});
	
	function sort(){
		var container=this.eq(0),
			hasOperation=container.find('>table>tbody>tr:first-child>td:last-child').attr('data-key')==null,
			allTheadTds=container.find('>table>thead>tr>td'),
			
			allNotOperationTheadTds=allTheadTds.filter(function(i){
				if(hasOperation&&i===allTheadTds.length-1){
					return false;
				}
				
				return true;
			});
			
		allNotOperationTheadTds.each(function(){
			var td=$(this);
			td.addClass('thzt_recordlist_sort_init');
		});
			
		container.delegate('>table>thead>tr>td','click',function(e){
			e.stopPropagation();
			
			var theadTd=$(this),
				columnIndex=theadTd.index();
				
			if(hasOperation&&columnIndex===allTheadTds.length-1){
				return;
			}
				
			if(!theadTd.hasClass('thzt_recordlist_sort_ascend')){
				sortColumn.call(container,{
					columnIndex:columnIndex
				});
				
				allNotOperationTheadTds.removeClass().addClass('thzt_recordlist_sort_init');
				theadTd.removeClass().addClass('thzt_recordlist_sort_ascend');
				return;
			}
			
			sortColumn.call(container,{
				columnIndex:columnIndex,
				descend:true
			});
			
			allNotOperationTheadTds.removeClass().addClass('thzt_recordlist_sort_init');
			theadTd.removeClass().addClass('thzt_recordlist_sort_descend');
		});
		
		return this;
	}
	
	function sortColumn(){
		var container=this.eq(0),
			columnIndex=arguments[0].columnIndex,
			descend=arguments[0].descend,
			
			notEmptyTrs=container.find('>table>tbody>tr').filter(function(){
				var tr=$(this),
					td=tr.find('>td').eq(columnIndex),
					key=td.attr('data-key');
					
				return key!=null;
			}),
			sortedTrs=_.sortBy(notEmptyTrs, function(v){
				var tr=$(v),
					value=tr.find('>td').eq(columnIndex).html().trim();
					
				return value;
			}),
			sortedTbodyHtml=(descend?_.reduceRight:_.reduce)
				(sortedTrs,function(m,v){
					var tr=$(v),
						trHtml=tr.html();
				
					return m+'<tr>'+trHtml+'</tr>';
				},''),
				
			pageSize=container.recordList('getPageSize');
				
		container.recordList('clearDataList');
		container.find('>table>tbody').html(sortedTbodyHtml);
		container.recordList('page',pageSize);
		
		return this;
	}
}(jQuery,_));