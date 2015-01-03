(function(global,queryString){
	global.queryObject=(function(){
		var queryObject={};
		
		if(queryString===''){
			return queryObject;
		}
		
		var queryArray=queryString.slice(1).split('&');
			
		for(var i=0;i<queryArray.length;i++){
			var queryKeyValuePair=queryArray[i].split('='),
				queryKey=queryKeyValuePair[0],
				queryValue=queryKeyValuePair[1];
				
			queryObject[queryKey]=queryValue;
		}
		
		return queryObject;
	}());
}(window,window.location.search));