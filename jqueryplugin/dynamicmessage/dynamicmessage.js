(function($,clearTimeout,CyclicItem){

    $.pluginManager.extend('dynamicMessage',{
        init:init,
		setDataList:setDataList
    });

    function init(){
        var $container=this.eq(0),
			interval=arguments[0]&&arguments[0].interval;
		
			interval=interval||3000;

        $container
			.addClass('thzt_dynamicmessage')
			.data('thzt_dynamicmessage_interval',interval)
			.delegate('>div:last-child>div','animationend',function(){
				var $animationRegion=$(this),
					cyclicItem=$container.data('thzt_dynamicmessage_data');

				$animationRegion
					.find('>div:lt(5)').remove()
					.end().removeClass('thzt_dynamicmessage_moveup_animation');

				var timer=setTimeout(function(){
					appendItemList.call($container,cyclicItem.getItem(5));				
					$animationRegion.addClass('thzt_dynamicmessage_moveup_animation');
				},interval);

				$container.data('thzt_dynamicmessage_timer',timer);
			});

        return this;
    }

    //dataList:[{name:姓名,value:省份,ext:电话,...]
	function setDataList(dataList){
		var $container=this.eq(0),
			cyclicItem=new CyclicItem(dataList),
			
			timer=$container.data('thzt_dynamicmessage_timer'),
			interval=$container.data('thzt_dynamicmessage_interval'),
			
			$animationRegion=$container.find('>div:last-child>div'),
			itemLength=$animationRegion.find('>div').length;

		clearTimeout(timer);		
		$container.data('thzt_dynamicmessage_data',cyclicItem);

		//under animation
		if(itemLength>5){
			return;
		}

		//first load, add 5 item.
		itemLength===0
			&&appendItemList.call($container,cyclicItem.getItem(5));

		//wait next animation
		var timer=setTimeout(function(){
			appendItemList.call($container,cyclicItem.getItem(5));			
			$animationRegion.addClass('thzt_dynamicmessage_moveup_animation');
		},interval);

		$container.data('thzt_dynamicmessage_timer',timer);
		return this;
	}
	
    function appendItemList(itemList){
        var $container=this,

            html=itemList.reduce(function(memo,val){
                return memo+'<div>\
                    <span>'+val.name+'</span>\
                    <span>'+val.value+'</span>\
                    <span>'+val.ext+'</span>\
                </div>';
            },'');

        $container
			.find('>div:last-child>div')
			.append(html);
		
        return this;
    }

}(jQuery,window.clearTimeout,window.CyclicItem));
