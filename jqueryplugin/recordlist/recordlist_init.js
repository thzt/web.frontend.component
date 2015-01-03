(function($,_){
	$.pluginManager.extend('recordList',{
		init:init,
		clear:clear
	});
	
	function init(){
		var container=this.eq(0),
			title=arguments[0],
			
			html='<table>\
				<thead>\
					<tr>'
						+_.reduce(title,function(m,v){
							return m+'<td>'+v+'</td>';
						},'')
					+'</tr>\
				</thead>\
				<tbody>\
				</tbody>\
			</table>';
			
		container
			.addClass('thzt_recordlist')
			.html(html);
			
		return this;
	}
	
	function clear(){
		var container=this.eq(0);
		
		container.children().remove();
		container.removeClass('thzt_recordlist');
		container.undelegate();
		
		return this;
	}
}(jQuery,_));