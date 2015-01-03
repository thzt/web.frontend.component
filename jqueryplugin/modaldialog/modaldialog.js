(function($){
	$.pluginManager.extend('modalDialog',{
		init:init,
		close:closeDialog
	});
	
	var dialogStack=[],
		closeData;
	
	function init(){
		var width=arguments[0].width,
			height=arguments[0].height,
			
			title=arguments[0].title,
			url=arguments[0].url,
			
			close=arguments[0].close;
			
		var dialog=initDialogHtml(title,url);
		
		setDialogCss.call(dialog,width,height)
			.delegate('>div>div>div:first-child>span','click',function(e){
				var closeButton=$(this);
				
				close
					&&close(closeData);
					
				closeData=null;
				
				dialog.undelegate().remove();
				
				e.stopPropagation();
			});
		
		return this;
	}
	
	function closeDialog(){
		var data=arguments[0],
			dialog=dialogStack.pop();
		
		closeData=data;
		
		dialog.find('>div>div>div:first-child>span').click();
		return this;
	}
	
	function initDialogHtml(title,url){
		var dialog=$('\
			<div><div><div>\
				<div>'+title+'<span>×</span></div>\
				<div>\
					<iframe src="'+url+'"></iframe>\
				</div>\
			</div></div></div>\
		');
		
		dialog.addClass('thzt_modaldialog').appendTo('body');
		
		dialogStack.push(dialog);
		
		return dialog;
	}
	
	function setDialogCss(width,height){
		var dialog=this;
		
		width&&
			dialog.find('>div>div').css({
				width:width
			});
		
		height
			&&dialog.find('>div>div').css({
				height:height
			});
		
		return this;
	}
}(jQuery));