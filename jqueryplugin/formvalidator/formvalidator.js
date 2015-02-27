(function($){
	$.pluginManager.extend('formValidator',{
		init:init
	});
	
	function init(){
		var $form=this.eq(0),
			$textboxes=$form.find('input[data-regexp]'),
			$submit=$form.find('input[type=submit],button[type=submit]'),
			
			timer;
		
		$submit.click(function(){
			var hasIllegalTextbox=false;
			
			window.clearTimeout(timer);
			$form.find('.thzt_formvalidator').remove();
		
			$textboxes.each(function(){
				var $textbox=$(this),
				
					value=$textbox.val(),
					regexp=new RegExp($textbox.attr('data-regexp')),
					warning=$textbox.attr('data-warning'),
					
					match=regexp.exec(value);
					
				if(match==null){
					hasIllegalTextbox=true;
					
					$textbox.after('<span class="thzt_formvalidator">'+warning+'</span>');
					timer=setTimeout(function(){
						$textbox.next('span').remove();
					},3000);
					
					return false;
				}
			});
			
			if(hasIllegalTextbox){
				return false;
			}
		});
		
		return this;
	}
}(jQuery));
