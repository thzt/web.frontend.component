(function($){
	
	$.pluginManager.extend('tableCore',{
		tool:tool
	});
	
	function tool(command){	
		return {
			setPageButtonStyle:setPageButtonStyle,
			getRenderData:getRenderData,
			timesReduce:timesReduce
		};
	}
	
	function setPageButtonStyle(){
		var $container=this.eq(0),
		
			tableData=$container.data('thzt_tablecore_data'),			
			pageIndex=tableData.pageIndex;
			
		$container
			.find('>div:last-child>span[data-page]')
			.removeClass('thzt_tablecore_currentpage')
			.eq(pageIndex+1)
			.addClass('thzt_tablecore_currentpage');
			
		return this;
	}
	
	function getRenderData(data,index,size){		
		var renderData=data.slice(index,size),
			remainderCount=size-renderData.length;
			
		return timesReduce(remainderCount,function(index,memo){
			memo.push([]);
			
			return memo;
		},renderData);
	}
	
	function timesReduce(n,callback,initVal){
		var memo=initVal;
		
		for(var i=0;i<n;i++){
			memo=callback(i,memo);
		}
		
		return memo;
	}
	
}(jQuery));