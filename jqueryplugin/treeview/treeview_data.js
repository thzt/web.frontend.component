(function($,_){
	$.pluginManager.extend('treeView',{
		parse:parse,
		append:append,
		remove:remove,
		get:get,
		set:set
	});
	
	function parse(){
		var container=this.eq(0),
			rootValue=container.find('>div>span:last-child').attr('data-value'),
			rootText=container.find('>div>span:last-child').text(),
			childData=createChildData.call(container.find('>ul'));
			
		return childData.length===0
			?({value:rootValue,text:rootText})
			:({
				value:rootValue,
				text:rootText,
				next:childData
			});
	}
	
	function append(){
		var container=this.eq(0),
			node=arguments[0],
			
			data=parse.call(container),
			position=getPosition.call(container),
			current=locate(data,position);
			
		current.next==null
			&&(current.next=[]);
			
		current.next.push(node);
		
		clear.call(container);
		container.treeView('init',data);
		container.treeView('bindUserEvent');
		setPosition.call(container,position);
		
		return this;
	}
	
	function remove(){
		var container=this.eq(0),
			node=arguments[0],
			
			data=parse.call(container),
			position=getPosition.call(container);
			
		if(position.length===0){
			return this;
		}
			
		var lastPosition=position.pop(),
			parent=locate(data,position);
		
		parent.next.splice(lastPosition,1);
		
		parent.next.length===0
			&&(parent.next=null);
		
		clear.call(container);
		container.treeView('init',data);
		container.treeView('bindUserEvent');
		
		return this;
	}
	
	function get(){
		var container=this.eq(0),
			
			data=parse.call(container),
			position=getPosition.call(container);
			
		return locate(data,position);
	}
	
	function set(){
		var container=this.eq(0),
			node=arguments[0],
			
			data=parse.call(container),
			position=getPosition.call(container),
			current=locate(data,position);
			
		current.value=node.value;
		current.text=node.text;
		
		clear.call(container);
		container.treeView('init',data);
		container.treeView('bindUserEvent');
		setPosition.call(container,position);
		
		return this;
	}
	
	function createChildData(){
		var ul=$(this),
			lis=ul.find('>li');
		
		return _.reduce(lis,function(m,v){
			var li=$(v),
				hasChild=li.find('>ul').length!==0,
				value=li.find('>div>span:last-child').attr('data-value'),
				text=li.find('>div>span:last-child').text();
				
			hasChild
				?m.push({
					value:value,
					text:text,
					next:createChildData.call(li.find('>ul'))
				})
				:m.push({value:value,text:text});
			
			return m;
		},[])
	}
	
	function getPosition(){
		var container=this,
			textSpan=container.find('.thzt_treeview_select'),
			li=textSpan.parent('div').parent('li'),
			position=[];
			
		if(li.length===0){
			return position;
		}
			
		position.unshift(li.index());
		
		while((li=li.parent('ul').parent('li')).length!==0){
			position.unshift(li.index());
		}
		
		return position;
	}
	
	function setPosition(position){
		var container=this;
		
		if(position.length===0){
			return;
		}
		
		container.find('>div>span:last-child').removeClass('thzt_treeview_select');
		
		var li=_.reduce(position,function(m,v){
				return m.find('>ul>li').eq(v);
			},container),
			textSpan=li.find('>div>span:last-child'),
			iconSpan=textSpan.prev('span');
			
		textSpan.addClass('thzt_treeview_select');
		iconSpan.removeClass('thzt_treeview_folder').addClass('thzt_treeview_folderopen');
	}
	
	function locate(data,position){
		if(position.length===0){
			return data;
		}
		
		return _.reduce(position,function(m,v){
			return m.next[v];
		},data);
	}
	
	function clear(){
		var container=this.eq(0);
			
		container.children().remove();
		container.undelegate();
		return this;
	}
}(jQuery,_));