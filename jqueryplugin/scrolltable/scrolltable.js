(function($,_){
	$.pluginManager.extend('scrollTable',{
		init:init,
		addData:addData,
		page:page
	});
	
	var PAGE_SIZE=3,
		MARGIN_TOP,
		BORDER_WIDTH,
		HEIGHT,
		WORD_MAX_COUNT=45,
	
		itemCount=0,
		itemIndex;
		
	function init(){
		var container=this.eq(0);
		
		container.addClass('thzt_scrolltable')
			.append(_.times(PAGE_SIZE,function(){
				return '\
					<div>\
						<img src="" alt="" hidden />\
						<div></div>\
						<div></div>\
					</div>';
			}).join(''));
		
		MARGIN_TOP=+container.find('>div:first-child').css('margin-top').slice(0,-2);
		BORDER_WIDTH=+container.find('>div:first-child').css('border-top-width').slice(0,-2);
		HEIGHT=+container.find('>div:first-child').css('height').slice(0,-2)+MARGIN_TOP+2*BORDER_WIDTH;
		
		itemCount+=PAGE_SIZE;
		showFirstPage.call(container);
		
		return this;
	}
	
	function addData(){
		var container=this.eq(0),
			dataList=arguments[0];
			
		_.each(dataList,function(v){
			$('<div>\
				<img src='+(v['avatar']==null?'../img/defaultavatar.jpg':v['avatar'])+' />\
				<div>'+v['name']+'</div>\
				<div>'+(v['message'].length<WORD_MAX_COUNT?v['message']:v['message'].slice(0,WORD_MAX_COUNT))+'</div>\
			</div>').appendTo(container);
		});
		
		itemCount+=dataList.length;
		showLastPage.call(container);
		return this;
	}
	
	function page(){
		var container=this.eq(0),
			command=arguments[0];
			
		switch(command){
			case 'first':
				showFirstPage.call(container);
				break;
				
			case 'last':
				showLastPage.call(container);
				break;
				
			case 'prev':
				showPreviousPage.call(container);
				break;
				
			case 'next':
				showNextPage.call(container);
				break;
		}
	}
	
	function showFirstPage(){
		var container=this;
		
		if(itemCount<=2*PAGE_SIZE){
			showIndex.call(container,itemCount-PAGE_SIZE);
			return;
		}
		
		showIndex.call(container,PAGE_SIZE);
	}
	
	function showLastPage(){
		var container=this;
		
		if(itemCount<=2*PAGE_SIZE){
			showIndex.call(container,itemCount-PAGE_SIZE);
			return;
		}
	
		showIndex.call(container,itemCount-PAGE_SIZE);
	}
	
	function showPreviousPage(){
		var container=this;
	
		if(itemCount<=2*PAGE_SIZE){
			showIndex.call(container,itemCount-PAGE_SIZE);
			return;
		}
		
		if(itemIndex<2*PAGE_SIZE){
			showIndex.call(container,PAGE_SIZE);
			return;
		}
		
		showIndex.call(container,itemIndex-PAGE_SIZE);
		return;
	}
	
	function showNextPage(){
		var container=this;
	
		if(itemCount<=2*PAGE_SIZE){
			showIndex.call(container,itemCount-PAGE_SIZE);
			return;
		}
		
		if(itemIndex+2*PAGE_SIZE>=itemCount){
			showIndex.call(container,itemCount-PAGE_SIZE);
			return;
		}
		
		showIndex.call(container,itemIndex+PAGE_SIZE);
		return;
	}
	
	function showIndex(index){
		var container=this;
			
		container.find('>div:first-child').css('margin-top',MARGIN_TOP-index*HEIGHT+'px');
		itemIndex=index;
	}
}(jQuery,_));