(function($,_){
	$.pluginManager.extend('selectList',{
		filter:filter
	});
	
	function filter(){
		var container=this.eq(0),
		
			sourceSelect=container.find('>div:last-child>select').eq(0),
			targetSelect=container.find('>div:last-child>select').eq(1);
			
		container.delegate('>div:first-child>input[type=button]','click',function(e){
			var button=$(this),
				filterText=$.trim(button.prev('input[type=text]').val());
				
			sourceSelect
				.children('option')
				.each(function(){
					var option=$(this);
					option.removeAttr('selected');
				})
				.show()
				.filter(function(){
					var option=$(this),
						optionText=$.trim(option.text());
						
					return optionText.indexOf(filterText)===-1;
				})
				.hide();
				
			e.stopPropagation();
		});
		
		container.delegate('>div:last-child>select:nth-of-type(1)>option','click',function(e){
			var option=$(this),
				optionText=option.text(),
				
				filterTextbox=container.find('>div:first-child>input[type=text]');
				
			filterTextbox.val(optionText);
			
			e.stopPropagation();
		});
		
		return this;
	}
}(jQuery,_));