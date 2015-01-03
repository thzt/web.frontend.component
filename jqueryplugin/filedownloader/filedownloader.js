(function($){
	$.pluginManager.extend('fileDownloader',{
		init:init,
		triggerDownload:triggerDownload
	});
	
	var DOWNLOAD_HANDLER_PAGE='../thirdpart/jqueryplugin/filedownloader/downloadfile.php',
		UPLOAD_FOLDER_DEEPTH='../../../../admin/';
	
	function init(){
		var container=this.eq(0),
			filePath=arguments[0];
			
		container.attr('data-path',filePath);
		
		return this;
	}
	
	function triggerDownload(){
		var container=this.eq(0),
			relativeUrl=container.attr('data-path'),
			abosulteUrl=DOWNLOAD_HANDLER_PAGE+'?filePath='+UPLOAD_FOLDER_DEEPTH+relativeUrl;
			
		location.href=abosulteUrl;
		
		return this;
	}
}(jQuery));