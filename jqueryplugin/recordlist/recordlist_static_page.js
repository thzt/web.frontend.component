(function($,global){
	$.pluginManager.extend('recordList',{
		page:pageSetting,
		setPageIndex:setPageIndex,
		getPageIndex:getPageIndex
	});

	var pageSize,
		pageCount,
		
		allTrs,
		pageButtons,
		indexReporter;

	function pageSetting(){
		var container=this.eq(0);
		
		pageSize=arguments[0];
		
		fillEmptyRow.call(container);    //will set allTrs & pageCount variables
		addPageButtons.call(container);    //will set pageButtons & indexReporter variables
		
		update(1);
		bindClickEventToPageButtons.call(container);
		
		return this;
	}
	
	function setPageIndex(){
		var container=this.eq(0),
			pageIndex=arguments[0];
			
		if(pageIndex<1||pageIndex>pageCount){
			return this;
		}
		
		update(pageIndex);		
		return this;
	}
	
	function getPageIndex(){
		var regexp=/#recordlist_page_index=(\d+)/,
			match=regexp.exec(global.location.hash);
			
		if(match==null){
			return null;
		}
		
		return +match[1];
	}
	
	function fillEmptyRow(){
		var container=this;
		
		allTrs=container.find('>table>tbody>tr');
		pageCount=Math.ceil(allTrs.length/pageSize)||1;    //at least one page
		
		columnCount=container.find('>table>thead>tr>td').length;
		
		container
			.find('>table>tbody')
			.append(
				_.times(pageCount*pageSize-allTrs.length,function(){
					return '<tr>'
						+_.times(columnCount,function(){
							return '<td>&nbsp;</td>';    //use &nbsp; to hold row height
						}).join('')
						+'</tr>';
				}).join(''));
				
		allTrs=container.find('>table>tbody>tr'); 
	}
	
	function addPageButtons(){
		var container=this;
		
		container.append('\
			<div>\
				<div>\
					<span>首页</span>\
					<span>上一页</span>\
					<span>下一页</span>\
					<span>尾页</span>\
				</div>\
				<span>1/'+pageCount+'</span>\
			</div>\
			');
		
		pageButtons=container.find('>div>div>span');
		indexReporter=container.find('>div>span');
	}

	function bindClickEventToPageButtons(){
		var container=this;
		
		container.delegate('>div>div>span','click',function(e){
			var span=$(this),
				currentPageIndex=Math.floor(container.find('>table>tbody>tr:visible').eq(0).index()/pageSize)+1;

			switch(span.index()){
				case 0:    //first
					currentPageIndex>1
						&&update(1);
						
					break;
				case 1:    //prev
					currentPageIndex>1
						&&update(currentPageIndex-1);
						
					break;
				case 2:    //next
					currentPageIndex<pageCount
						&&update(currentPageIndex+1);
						
					break;
				case 3:    //last
					currentPageIndex<pageCount
						&&update(pageCount);
						
					break;
			}
			
			e.stopPropagation();
		});
	}

	function update(pageIndex){
		showPageOfIndex(pageIndex);
		updataPageButtons(pageIndex);
		updateIndexReporter(pageIndex);
		global.location.hash='#recordlist_page_index='+pageIndex;
	}

	//index started from 1
	function showPageOfIndex(pageIndex){
		var begin=(pageIndex-1)*pageSize+1,
			end=pageIndex*pageSize;
			
		showTrOfRange(begin,end);
	}

	function updataPageButtons(pageIndex){
		pageButtons.removeClass('thzt_recordlist_page_disabled');
		
		if(pageCount==1){
			pageButtons.addClass('thzt_recordlist_page_disabled');
			return;
		}
		
		if(pageIndex==1){
			pageButtons.eq(0).addClass('thzt_recordlist_page_disabled');
			pageButtons.eq(1).addClass('thzt_recordlist_page_disabled');
			return;
		}
		
		if(pageIndex==pageCount){
			pageButtons.eq(2).addClass('thzt_recordlist_page_disabled');
			pageButtons.eq(3).addClass('thzt_recordlist_page_disabled');
			return;
		}
	}

	function updateIndexReporter(pageIndex){
		indexReporter.text(pageIndex+'/'+pageCount);
	}

	//range: [begin,end]
	function showTrOfRange(begin,end){
		allTrs
			.hide()
			.filter(function(i){
				return i>=begin-1
					&&i<end;
			})
			.show();
	}
}(jQuery,this));