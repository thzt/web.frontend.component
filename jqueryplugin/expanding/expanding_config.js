(function($){
	
	$.pluginManager.filter('expanding',{
		init:init
	});
	
	function init(){
		var $container=this;
		
		return [{
			initRadius:(arguments[0]&&arguments[0].initRadius)||30,
			maxRadius:(arguments[0]&&arguments[0].maxRadius)||500,
			interval:(arguments[0]&&arguments[0].interval)||1500,
			
			color:(arguments[0]&&arguments[0].color)||[0,0,0],
			radius:(arguments[0]&&arguments[0].radius)||150,
			left:(arguments[0]&&arguments[0].left)||0,
			top:(arguments[0]&&arguments[0].top)||0
		}];
	}
	
}(jQuery));