(function($){
	
	$.pluginManager.extend('datepickerWrapper',{
		init:init,
		
		setDate:setDate,
		getDate:getDate,
		
		setStartDate:setStartDate,
		setEndDate:setEndDate
	});
	
	function init(){
		var $container=this.eq(0),
		
			autoClose=arguments[0].autoClose,
			minView=arguments[0].minView,
			bootstrapVersion=arguments[0].bootstrapVersion,
			
			format=arguments[0].format;
			
		$container.datetimepicker({
			autoclose:autoClose,
			minView:minView,
			bootcssVer:bootstrapVersion,
			
			format:format
		});
		
		return this;		
	}
	
	function setDate(){
		var $container=this.eq(0),
			date=arguments[0].date;
		
		$container.val(date);
		return this;
	}
	
	function getDate(){
		var $container=this.eq(0);
				
		return $container.val();
	}
	
	function setStartDate(){
		var $container=this.eq(0),
			date=arguments[0].date;
		
		$container.datetimepicker('setStartDate',date);
		return this;
	}
	
	function setEndDate(){
		var $container=this.eq(0),
			date=arguments[0].date;
		
		$container.datetimepicker('setEndDate',date);
		return this;
	}
	
}(jQuery));