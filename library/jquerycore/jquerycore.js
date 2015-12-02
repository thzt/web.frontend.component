(function(global){
	
	//export
	global.jQuery=jQuery;
	
	//private region	
	jQuery.prototype=InstanceCreation.prototype;
	jQuery.extend=jQuery.prototype.extend=extend;
	
	function jQuery(selector){
		return new InstanceCreation(selector);
	}
	
	function InstanceCreation(selector){
		var instance=this;

		return jQuery.select.call(instance,selector);
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
}(window));
