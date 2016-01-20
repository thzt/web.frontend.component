(function(global,$){

	$.extend({
		select:function(selector){
			var instance=this,
				elements=select(selector);

			[].forEach.call(elements,function(v,i){
				instance[i]=v;
			});
			
			instance.length=elements.length;			
			return this;
		}
	});

	function select(selector){
		
		switch(true){

			//use case: $()
		case selector==null:
			return [];
			
			//use case: $('input')
		case typeof selector==='string':
			return global.document.querySelectorAll(selector);
			
			//use case: $([object NodeList])
		case selector.length!=null:
			return selector;
			
			//use case: $([object HTMLInputElement]), selector.length==null
		default:
			return [selector];		
		}
	}
	
}(window,jQuery));
