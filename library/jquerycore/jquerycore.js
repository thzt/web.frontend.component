(function(global,document){
	jQuery.prototype=InstanceCreation.prototype;
	jQuery.extend=jQuery.prototype.extend=extend;
	
	function jQuery(selector){
		return new InstanceCreation(selector);
	}
	
	function InstanceCreation(selector){
		var instance=this;
			
		instance[0]=document.querySelector(selector);
		return this;
	}
	
	function extend(material){
		var depository=this;
	
		for(var property in material){
			if(!material.hasOwnProperty(property)){
				continue;
			}
			
			depository[property]=material[property];
		}
		
		return this;
	};
	
	//export:
	global.jQuery=jQuery;
}(window,document));