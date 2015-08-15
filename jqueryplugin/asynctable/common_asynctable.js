//1. use case:
//
//var table=new AsyncTable({
//	$asyncTable:$('#asyncTable'),
//	$tablePage:$('#tablePage'),
//	url:'/Home/Index'
//});
//
//table.update({
//	condition:''
//});



//2. send:
//
//{
//	pageIndex:0,
//  pageSize:10,
//	sortStatus:{
//		columnIndex:0,
//		columnText:'',
//	    columnValue:'',
//		isAscend:true
//	},
//	condition:{
//	}
//}


//3. receive
//
//{
//	jsonQueryResult:{
//		success:true
//		message:'',
//		code:'',
//		totalCount:0,
//		result:[]
//	}
//}


(function(global){
	
	global.AsyncTable=AsyncTable;
	
	function AsyncTable(){
		var instance=this,
		
			url=arguments[0].url,
			$tablePage=arguments[0].$tablePage,
			$asyncTable=arguments[0].$asyncTable;
		
		instance.url=url;
		instance.$tablePage=$tablePage;
		instance.$asyncTable=$asyncTable;

		initTable.call(instance,$asyncTable,$tablePage);		
		return this;
	}
	
	AsyncTable.prototype={
		update:function(){
			var instance=this,
				condition=arguments[0].condition,
				
				url=instance.url,
				$tablePage=instance.$tablePage,
				$asyncTable=instance.$asyncTable,
				
				pageSize=$asyncTable.asyncTable('getPageSize'),
				sortStatus=$asyncTable.asyncTable('getSortStatus');
			
			$.sendAjax({
				url:url,
				data:{
					pageIndex:0,
					pageSize:pageSize,
					sortStatus:sortStatus,
					condition:condition
				},
				success:function(r){
					var data=r.jsonQueryResult;
					
					if(!data.success){
						alert(data.message);
						return;
					}
					
					var totalCount=data.totalCount,
						result=data.result,
						pageSize=$asyncTable.asyncTable('getPageSize'),
						pageCount=result.length===0
							?0
							:Math.ceil(totalCount/pageSize);
					
					$tablePage.tablePage('setPageCount',{
						pageCount:pageCount
					});
					
					$asyncTable.asyncTable('setData',{
						data:result
					});
					
					instance.condition=condition;
				}
			});
			
			return this;
		}
	};
	
	function initTable($asyncTable,$tablePage){
		var instance=this;
		
		$tablePage.tablePage('init',{
			pageCount:0,
			click:function(){
				handlePageClickEvent.apply(instance,arguments);
			}
		});
		
		$asyncTable.asyncTable('init',{
			sort:function(){
				handleSortClickEvent.apply(instance,arguments);
			}
		});
	}
	
	function handlePageClickEvent(pageIndex,afterClick){
		var instance=this,
		
			url=instance.url,
			condition=instance.condition,
			$asyncTable=instance.$asyncTable,
			
			sortStatus=$asyncTable.asyncTable('getSortStatus'),
			pageSize=$asyncTable.asyncTable('getPageSize');		
		
		$.sendAjax({
			url:url,
			data:{
				pageIndex:pageIndex,
				pageSize:pageSize,
				sortStatus:sortStatus,
				condition:condition
			},
			success:function(r){
				var data=r.jsonQueryResult;
				
				if(!data.success){
					alert(data.message);
					return;
				}
				
				$asyncTable.asyncTable('setData',{
					data:data.result
				});
				
				afterClick();
			}
		});
	}
	
	function handleSortClickEvent(sortStatus,afterSort){
		var instance=this,
		
			url=instance.url,
			condition=instance.condition,
			$asyncTable=instance.$asyncTable,
			
			pageSize=$asyncTable.asyncTable('getPageSize');	
			
		$.sendAjax({
			url:url,
			data:{
				pageIndex:0,
				pageSize:pageSize,
				sortStatus:sortStatus,
				condition:condition
			},
			success:function(r){
				var data=r.jsonQueryResult;
				
				if(!data.success){
					alert(data.message);
					return;
				}
				
				$asyncTable.asyncTable('setData',{
					data:data.result
				});
				
				afterSort();
			}
		});
	}
}(window));

