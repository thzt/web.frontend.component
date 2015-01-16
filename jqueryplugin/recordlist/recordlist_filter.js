(function ($, _) {
    $.pluginManager.extend('recordList', {
        filter: filter
    });

    function filter(){
		var container=this.eq(0),
			filterText=arguments[0];
			
		container
			.find('>table>tbody>tr')
			.hide()
			.filter(function () {
				var tr = $(this),
					content = tr.text(),
					isContainFilterText = content.toLowerCase().indexOf(filterText.toLowerCase()) != -1;

				return isContainFilterText;
			})
			.show();
			
		return this;
	}
} (jQuery, _));
    
