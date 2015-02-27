(function($){
	$.pluginManager.extend('formValidator',{
		isIllegal:isIllegal,
		showFirstWarning:showFirstWarning
	});
	
	var timer;
	
	function isIllegal(){
		var $form=this.eq(0),
			$illegalTextboxes=getIllegalTextboxes.call($form);
			
		return $illegalTextboxes.length!==0;
	}
	
	function showFirstWarning(){
		var $form=this.eq(0),
			$illegalTextboxes=getIllegalTextboxes.call($form),
			
			$firstTextbox=$illegalTextboxes.eq(0),
			warning=$firstTextbox.attr('data-warning');
			
		window.clearTimeout(timer);
		$form.find('.thzt_formvalidator').remove();
		
		$firstTextbox.before('<span class="thzt_formvalidator">'+warning+'</span>');
		timer=setTimeout(function(){
			$firstTextbox.prev('span').remove();
		},3000);
		
		return this;
	}
	
	function getIllegalTextboxes(){
		var $form=this,
			$textboxes=$form.find('input[data-regexp]');
			
		return $textboxes.filter(function(){
			var $textbox=$(this),
			
				value=$textbox.val(),
				regexp=new RegExp($textbox.attr('data-regexp')),
				
				match=regexp.exec(value);
				
			return match==null;
		});
	}
}(jQuery));
