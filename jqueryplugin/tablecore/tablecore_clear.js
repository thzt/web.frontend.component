(function($){
	
	$.pluginManager.extend('tableCore',{
		clear:clear
	});
	
	function clear(){
		var $container=this.eq(0);
		
		$container
			.removeClass('thzt_tablecore')
			.undelegate()
			.removeData('thzt_tablecore_data')
			.find('>div:last-child').html('').end()
			.find('>table>tbody>tr>td').html('').end()
			.hide();
			
		return this;
	}
	
}(jQuery));