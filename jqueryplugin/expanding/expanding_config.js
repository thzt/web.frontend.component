(function($){
	
	$.pluginManager.filter('expanding',{
		init:init
	});
	
	function init(){
		var $container=this;
		
		return [{
			maxRadius:(arguments[0]&&arguments[0].maxRadius)||200,
			color:(arguments[0]&&arguments[0].color)||[0,0,0],
			radius:(arguments[0]&&arguments[0].radius)||150,
			interval:(arguments[0]&&arguments[0].interval)||3000,
			left:(arguments[0]&&arguments[0].left)||0,
			top:(arguments[0]&&arguments[0].top)||0
		}];
	}
	
}(jQuery));