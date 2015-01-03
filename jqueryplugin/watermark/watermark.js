(function($){
	$.pluginManager.extend('watermark',{
		init:init,
		getValue:getValue
	});
	
	function init(){
		var textarea=this.eq(0),
		
			text=textarea.val();
			
		textarea.addClass('thzt_watermark');
		
		textarea.focus(function(){
			var textarea=$(this),
				isUserHasEdit=textarea.hasClass('thzt_watermark_user');
			
			if(isUserHasEdit){
				return;
			}
			
			textarea
				.addClass('thzt_watermark_user')
				.val('');
		});
		
		textarea.blur(function(){
			var textarea=$(this),
				isUserHasEdit=$.trim(textarea.val())!=='';
				
			if(isUserHasEdit){
				return;
			}
			
			textarea
				.removeClass('thzt_watermark_user')
				.val(text);
		});
		
		return this;
	}
	
	function getValue(){
		var textarea=this.eq(0),
			isUserHasEdit=textarea.hasClass('thzt_watermark_user');
		
		return isUserHasEdit
			?textarea.val()
			:'';
	}
}(jQuery));