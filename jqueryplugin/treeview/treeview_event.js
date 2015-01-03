(function($){
	$.pluginManager.extend('treeView',{
		bind:bind,
		bindUserEvent:bindUserEvent
	});
	
	function bind(){
		var container=this.eq(0);
		
		container.data('thzt_treeview_rootclick',arguments[0].rootClick);
		container.data('thzt_treeview_nodeclick',arguments[0].nodeClick);
		container.data('thzt_treeview_leafclick',arguments[0].leafClick);
			
		bindUserEvent.call(container);
		
		return this;
	}
	
	function bindUserEvent(){
		var container=this.eq(0),
		
			rootClick=container.data('thzt_treeview_rootclick'),
			nodeClick=container.data('thzt_treeview_nodeclick'),
			leafClick=container.data('thzt_treeview_leafclick');
			
		container.delegate('>div','click',function(e){
			e.stopPropagation();
		
			var div=$(this);
			
				current=container.treeView('get');
			
			rootClick
				&&rootClick.call(div,current);
		});
			
		container.delegate('li','click',function(e){
			e.stopPropagation();
		
			var li=$(this),
				isLeaf=li.find('>ul').length===0,
				
				current=container.treeView('get');
				
			isLeaf
				?leafClick&&leafClick.call(li,current)
				:nodeClick&&nodeClick.call(li,current);
		});
		
		return this;
	}
}(jQuery));