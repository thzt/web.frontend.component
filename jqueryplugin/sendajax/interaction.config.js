(function($){

	$.sendAjaxByExtension=sendAjaxByExtension;

	function sendAjaxByExtension(){
		var url=arguments[0].url,
			data=arguments[0].data,
			success=arguments[0].success;

		return $.interaction({
			parameter:{
				url:url,
				data:data
			},
			handler:{
				success:success
			},
			method:function(param,handler){
				return $.ajax({
					url:param.url,
					data:param.data,
					success:handler.success
				});
			}
		});
	}
	
}(jQuery));
