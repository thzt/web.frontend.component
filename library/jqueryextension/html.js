//use:
//$.prototype.each

(function($){
	
	$.prototype.extend({
		html:html
	});
	
	function html(value){
		var $elements=this;		
		
		if(value==null){
			return getHtml.call($elements);
		}
		
		return setHtml.call($elements,value);
	}
	
	function getHtml(){
		var $elements=this;
		
		return $elements[0].innerHTML;
	}
	
	function setHtml(html){
		var $elements=this;
		
		$elements.each(function(){
			var item=this;
			
			item.innerHTML=html;
		});
		
		return this;
	}
	
}(jQuery));