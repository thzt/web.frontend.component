(function(global){
	global.sendAjax=function(){
		var url=arguments[0].url,
			data=arguments[0].data,
			success=arguments[0].success,
			
			xhr=new XMLHttpRequest();
		
		xhr.open('POST',url,true);
		xhr.onreadystatechange = function() {
			xhrReadyStateChangeHandler.call(xhr,url,data,success);
		};
		
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xhr.send(data);
	};
	
	var COMPLETE=4,
		OK=200,
		NOT_MODIFIED=304;
	
	function xhrReadyStateChangeHandler(url,data,success){
		var xhr=this;
	
		if (xhr.readyState!==COMPLETE){
			return;
		}
		
		//chrome bug: when continuous refresh the browse or network break off, this will happen.
		if(xhr.status===0&&xhr.responseText===''){
			return;
		}
		
		if(xhr.status!==OK&&xhr.status!==NOT_MODIFIED){
			alert(
				'sendAjax xhr.status error.\n'
				+'url: '+url+'\n'
				+'data: '+data+'\n'
				+'status: '+xhr.status+'\n'
				+'responseText: '+xhr.responseText
			);	
			return;
		}
		
		var json;
		
		try{
			json=global.eval('('+xhr.responseText+')');
		}catch(ex){
			alert(
				'sendAjax parse json error.\n'
				+'url: '+url+'\n'
				+'data: '+data+'\n'
				+'exception message: '+ex.message+'\n'
				+'responseText: '+xhr.responseText
			);
			return;
		}
		
		if(!json.status){
			alert(
				'sendAjax response.status is unexpected.\n'
				+'url: '+url+'\n'
				+'data: '+data+'\n'
				+'responseText: '+xhr.responseText
			);
			return;
		}
		
		success
			&&success(json.content);
	}
}(this));