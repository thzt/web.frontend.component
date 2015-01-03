(function($,_){
	$.pluginManager.extend('articleList',{
		init:init,
		addDataList:addDataList,
		getLastItemValue:getLastItemValue
	});
	
	function init(){
		var container=this.eq(0);
		
		container.addClass('thzt_articlelist');
		return this;
	}
	
	function addDataList(){
		var container=this.eq(0),
		
			dataList=arguments[0];
			
		container.append(_.reduce(dataList,function(m,v){
			return m
				+'<div>\
					<div data-value="'+v.datetime+'">\
						'+v.text+'\
					</div>\
					<div>\
						<img src="'+v.imgUrl+'" />\
					</div>\
				</div>'
		},''));
		
		return this;
	}
	
	function getLastItemValue(){
		var container=this.eq(0),
		
			lastItem=container.find('>div:last-child>div:first-child'),
			value=lastItem.attr('data-value');
			
		return value;
	}
}(jQuery,_));