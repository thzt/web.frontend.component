(function($){
	
	$.pluginManager.extend('dataBar',{
		init:init
	});
	
	function init(){
		var $container=this.eq(0),
			data=arguments[0].data,
			
			html=data.map(function(item){
				return '<div>\
						<span>'+item.name+'</span>\
						<span>'+item.value+'</span>\
						<span style="width:'+item.width+'px;"></span>\
					</div>';
			}).join('');
			
		$container
			.addClass('thzt_databar')
			.html(html);
			
		return this;
	}
	
}(jQuery));