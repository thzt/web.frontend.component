(function($){
				
	$.pluginManager.extend('advertise',{
		init:init
	});
	
	function init(){
		var $container=$(this),
			timeout=arguments[0].timeout,
			
			timer=setTimeout(function(){
				$container.hide();
			},timeout);
			
		$container.addClass('thzt_advertise');
		$container.delegate('>div','click',function(e){
			e.stopPropagation();
			
			$container.hide();
			window.clearTimeout(timer);
		});
		
		return this;
	}
	
}(jQuery));