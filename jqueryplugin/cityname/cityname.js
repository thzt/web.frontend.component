(function($){
	
	$.pluginManager.extend('cityName',{
		init:init,
		setColor:setColor
	});
	
	// data=[{
	// 	id:1,
	// 	name:'烟台市',
	// 	position:[x,y]
	// }];
	function init(){
		var $container=this.eq(0),
			data=arguments[0].data,
			html=data.reduce(function(memo,val){
				return memo+'\
					<div data-id="'+val.id+'" style="left:'+val.position[0]+'px;top:'+val.position[1]+'px;">\
						<span></span>\
						<span>'+val.name+'</span>\
					</div>';
			},'');
			
		$container.addClass('thzt_cityname');
		$container.html(html);
		return this;
	}
	
	function setColor(){
		var $container=this.eq(0),
			id=arguments[0].id,
			color=arguments[0].color;
			
		$container
			.find('[data-id='+id+']')
			.find('>span:nth-child(1)').css({background:color[0]})
			.end().find('>span:nth-child(2)').css({color:color[1]});
			
		return this;
	}
	
}(jQuery));