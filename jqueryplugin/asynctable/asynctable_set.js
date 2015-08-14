(function($){
	
	$.pluginManager.extend('asyncTable',{
		setData:setData
	});
	
	function setData(){
		var $container=this.eq(0),
			data=arguments[0].data,
			
			pageSize=$container.find('>tbody>tr').length;
			
		$container.bindTemplate('setData',{
			data:getRenderData(data,0,pageSize)
		});
		
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