(function(global){
	
	//export 
	global.RatioTaker=RatioTaker;
	
	//private region
	function RatioTaker(){
		var instance=this,
		
			min=arguments[0].min,
			max=arguments[0].max,
			section=arguments[0].section;
			
		instance.min=min;
		instance.max=max;
		instance.section=section;
		
		return this;
	}
	
	RatioTaker.prototype={
		get:function(value){
			var instance=this,
			
				min=instance.min,
				max=instance.max,
				section=instance.section;
				
			if(value<min){
				return section[0];
			}
			if(value>max){
				return section[section.length-1];
			}
				
			return section[Math.round((value-min)/(max-min)*(section.length-1))];
		}
	};
	
}(window));