(function($){
	
	$.pluginManager.filter('bindTemplate',{
		setData:filterSetData
	});
	
	function filterSetData(){
		var data=arguments[0].data;
		
		return [{
			attr:'data-value',
			data:data,
			set:setFieldValue
		}];
	}
	
	function setFieldValue(val){
		var $td=this,
			isLastChild=$td.is(':last-child');
			
		if(val==null){
			$td.html('　');
			return;
		}
			
		if(isLastChild){
			$td.html(val.map(function(v){
				return '<span>'+v+'</span>';
			}).join('\n'));
			
			return;
		}
		
		$td.html(val);
	}
	
}(jQuery));