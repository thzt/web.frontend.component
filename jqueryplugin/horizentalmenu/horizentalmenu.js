(function($){

	$.pluginManager.extend('horizentalMenu',{
		init:init,
		getSelectedItem:getSelectedItem,
		selectItemByIndex:selectItemByIndex,
		selectItemByValue:selectItemByValue
	});

	function init(){
		var $container=this.eq(0);

		return this;
	}

	function getSelectedItem(){
		var $container=this.eq(0),
			$selectedItem=$container.find('.thzt_horizentalmenu_active');

		return{
			index:$selectedItem.index(),
			value:$selectedItem.attr('data-value'),
			text:$selectedItem.html().trim()
		};
	}

	function selectItemByIndex(index){
		var $container=this.eq(0);

		$container.find('.thzt_horizentalmenu_active')
			.removeClass('thzt_horizentalmenu_active')
			.parent('tr').children('td').eq(index)
			.addClass('thzt_horizentalmenu_active');

		return this;
	}

	function selectItemByValue(value){
		var $container=this.eq(0);

		$container.find('.thzt_horizentalmenu_active')
			.removeClass('thzt_horizentalmenu_active')
			.parent('tr').children('td').filter(function(){
				var $td=$(this),
					itemValue=$td.attr('data-value');

				return itemValue==value;
			})
			.addClass('thzt_horizentalmenu_active');

		return this;
	}
	
}(jQuery));
