(function($,_){
	$.pluginManager.extend('selectList',{
		order:order
	});
	
	function order(){
		var container=this.eq(0),
		
			sourceSelect=container.find('>div:last-child>select').eq(0),
			targetSelect=container.find('>div:last-child>select').eq(1);
			
		container.delegate('>div:nth-of-type(2)>div:nth-of-type(2)>input:first-child','click',function(e){
			var button=$(this),
				selectedTarget=targetSelect.find('>option:selected');
				
			if(selectedTarget.length===0){
				return;
			}
			
			if(selectedTarget.index()===0){
				return;
			}
			
			selectedTarget.insertBefore(selectedTarget.eq(0).prev('option'));
			
			e.stopPropagation();
		});
		
		container.delegate('>div:nth-of-type(2)>div:nth-of-type(2)>input:last-child','click',function(e){
			var button=$(this),
				selectedTarget=targetSelect.find('>option:selected');
				
			if(selectedTarget.length===0){
				return;
			}
			
			if(selectedTarget.index()===targetSelect.children('option').length-1){
				return;
			}
			
			selectedTarget.insertAfter(selectedTarget.eq(selectedTarget.length-1).next('option'));
			
			e.stopPropagation();
		});
		
		return this;
	}
}(jQuery,_));