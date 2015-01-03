(function($,_){
	$.pluginManager.extend('menu',{
		init:init,
		setMenuItem:setMenuItem,
		bindClickEvent:bindClickEvent
	});
	
	function init(){
		var container=this.eq(0);
		
		container.addClass('thzt_menu');
		return this;
	}
	
	/*
		menuItem=[
			{
				name:...,
				link:...
			},
			...
		]
	*/
	function setMenuItem(){
		var container=this.eq(0),
			menuItem=arguments[0],
			
			html='<ul>'
				+_.reduce(menuItem,function(m,v){
					return m+'<li data-link="'+v.link+'">'+v.name+'</li>'
				},'')
				+'</ul>';
		
		container.append(html);
		return this;
	}
	
	function bindClickEvent(){
		var container=this.eq(0),
			click=arguments[0];
			
		container.delegate('>ul>li','click',function(e){
			var clickedItem=$(this),
				link=clickedItem.attr('data-link');
			
			click.call(clickedItem,link);			
			e.stopPropagation();
		});
		
		return this;
	}
}(jQuery,_));