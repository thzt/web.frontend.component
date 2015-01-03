(function($,_){
	$.pluginManager.extend('treeView',{
		init:init
	});
	
	function init(){
		var container=this.eq(0),
			data=arguments[0];
		
		container
			.addClass('thzt_treeview')
			.append(createRoot(data.value,data.text))
			.append(createChild(data.next,[]));
			
		initEvent.call(container);
		initSelection.call(container);
		
		return this;
	}
	
	function createRoot(value,text){
		return '<div>'
			+'<span class=thzt_treeview_globe></span>'
			+'<span class=thzt_treeview_select data-value='+value+'>'+text+'</span>'
		+'</div>';
	}
	
	function createChild(data,indent){
		if(data==null){
			return '';
		}
	
		return '<ul>'
			+_.reduce(data,function(m1,v1,i){
				var hasChild=v1.next!=null,
					isLastItem=i===data.length-1;
					
				return m1
					+'<li>'
						+'<div>'
							+_.reduce(indent,function(m2,v2){
								return m2+'<span class='+getIndentClassName(v2)+'></span>';
							},'')
							+'<span class='+getClickSpanClassName(hasChild,isLastItem)+'></span>'
							+'<span class='+getIconClassName(hasChild)+'></span>'
							+'<span data-value='+v1.value+'>'+v1.text+'</span>'
						+'</div>'
						+(function(){
							if(!hasChild){
								return '';
							}
							
							indent.push(isLastItem?0:1);
							var html=createChild(v1.next,indent);
							indent.pop();
							
							return html;
						}())
					+'</li>';
			},'')
			+'</ul>';
	}
	
	function initEvent(){
		var container=this;
		
		container.delegate('.thzt_treeview_minusbottom,.thzt_treeview_minus','click',function(e){
			var span=$(this),
				isClickLastLi=span.parent('div').parent('li').is(':last-child'),
				className=span.attr('class');
			
			span.parent('div').next('ul').hide();
		
			span
				.removeClass()
				.addClass(className=='thzt_treeview_minus'
					?'thzt_treeview_plus'
					:'thzt_treeview_plusbottom');
					
			span.next('span').removeClass().addClass('thzt_treeview_folder');
			
			e.stopPropagation();
		});
		
		container.delegate('.thzt_treeview_plusbottom,.thzt_treeview_plus','click',function(e){
			var span=$(this),
				isClickLastLi=span.parent('div').parent('li').is(':last-child'),
				className=span.attr('class');
			
			span.parent('div').next('ul').show();
		
			span
				.removeClass()
				.addClass(className=='thzt_treeview_plus'
					?'thzt_treeview_minus'
					:'thzt_treeview_minusbottom');
					
			span.next('span').removeClass().addClass('thzt_treeview_folderopen');
			
			e.stopPropagation();
		});
	}
	
	function initSelection(){
		var container=this.eq(0);
		
		container.delegate('>div','click',function(e){
			var div=$(this),
				textSpan=div.find('>span:last-child');
				
			container.find('.thzt_treeview_select').removeClass('thzt_treeview_select');
			textSpan.addClass('thzt_treeview_select');
			
			container
				.find('li')
				.filter(function(){
					var li=$(this);
					
					return li.find('>ul').length===0;
				})
				.find('>div>span:last-child')
				.prev('span')
				.removeClass('thzt_treeview_folderopen')
				.addClass('thzt_treeview_folder');
				
			e.stopPropagation();
		});
		
		container.delegate('li','click',function(e){
			var li=$(this),
				textSpan=li.find('>div>span:last-child'),
				iconSpan=textSpan.prev('span');
				
			container.find('.thzt_treeview_select').removeClass('thzt_treeview_select');
			textSpan.addClass('thzt_treeview_select');
			
			container
				.find('li')
				.filter(function(){
					var li=$(this);
					
					return li.find('>ul').length===0;
				})
				.find('>div>span:last-child')
				.prev('span')
				.removeClass('thzt_treeview_folderopen')
				.addClass('thzt_treeview_folder');
				
			li.find('>ul').length===0
				&&iconSpan.removeClass('thzt_treeview_folder').addClass('thzt_treeview_folderopen');
			
			e.stopPropagation();
		});
		
		return this;
	}
	
	function getIndentClassName(flag){
		return flag===0
			?'thzt_treeview_empty'
			:'thzt_treeview_line';
	}
	
	function getClickSpanClassName(hasChild,isLastItem){
		return hasChild
			?(
				isLastItem
					?'thzt_treeview_minusbottom'
					:'thzt_treeview_minus'
			)
			:(
				isLastItem
					?'thzt_treeview_joinbottom'
					:'thzt_treeview_join'
			);
	}
	
	function getIconClassName(hasChild){
		return hasChild
			?'thzt_treeview_folderopen'
			:'thzt_treeview_folder';
	}
}(jQuery,_));