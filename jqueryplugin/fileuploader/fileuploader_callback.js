(function($){
	$.pluginManager.extend('fileUploader',{
		registerCallback:registerCallback,
		trigger:trigger
	});
	
	var callbackInfo={};
	
	//different button can set different callback
	function registerCallback(){
		var button=this.eq(0),
			buttonId=button.attr('id');
			
		callbackInfo[buttonId]=arguments[0];
		
		return this;
	}
	
	//uploadfile.php used this to response info
	function trigger(r){
		if(!r.status){
			alert(r.content);
			return;
		}
		
		callbackInfo[r.buttonId].call(null,r.content);
		return this;
	}
}(jQuery));