(function($){
	
	$.pluginManager.filter('datepickerWrapper',{
		init:filterInit
	});
	
	function filterInit(){
		var autoClose=arguments[0]&&arguments[0].autoClose,
			minView=arguments[0]&&arguments[0].minView,
			bootstrapVersion=arguments[0]&&arguments[0].bootstrapVersion,
		
			format=arguments[0]&&arguments[0].format;
		
		return [{
			autoClose:autoClose||true,
			minView:minView||2,
			bootstrapVersion:bootstrapVersion||3,
			
			format:format||'yyyy-mm-dd'
		}];
		
		return this;		
	}
	
}(jQuery));