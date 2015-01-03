(function($){
	$.pluginManager.extend('fileUploader',{
		init:init
	});
	
	function init(){
		var $buttons=this,
		
			timestamp=+new Date(),
			iframeName='thztUploadFileIframeName'+timestamp,
			
			//set form.target to iframe, will change iframe src to form's action
			$container=$('\
				<div style=display:none>\
					<iframe name='+iframeName+'></iframe>\
					<form \
						method=post \
						action=../thirdpart/jqueryplugin/fileuploader/uploadfile.php \
						enctype=multipart/form-data \
						target='+iframeName+'>\
							<input type=file name=file />\
							<input type=text name=buttonId />\
					</form>\
				</div>');
				
		$('body').append($container);
		
		var $uploadForm=$container.find('>form'),
		
			//file: used to send file
			$fileInput=$uploadForm.find('>input[type=file]'),
			
			//textbox: used to send data
			$buttonId=$uploadForm.find('>input[type=text][name=buttonId]');
		
		$fileInput.change(function(){
		
			//if last time upload failed, this time cancel upload
			if($fileInput.val()===''){
				return;
			}
			
			$uploadForm.submit();
		});
		
		$buttons.each(function(){
			var $button=$(this),
				buttonId=$button.attr('id');
				
			$button.click(function(){
			
				//set buttonId, fileUploader.fn.trigger used it to dispatch
				$buttonId.val(buttonId);
				$fileInput.click();
			});
		});
		
		return this;
	}
}(jQuery));