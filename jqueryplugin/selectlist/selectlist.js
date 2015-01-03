(function($,_){
	$.pluginManager.extend('selectList',{
		init:init,
		set:setData,
		get:getSelection,
	});
	
	function init(){
		var container=this.eq(0),
			
			sourceSelect=container.find('>div:last-child>select').eq(0),
			targetSelect=container.find('>div:last-child>select').eq(1);
			
		container.addClass('thzt_selectlist');
		
		container.delegate('>div:nth-of-type(2)>div:nth-of-type(1)>input:first-child','click',function(e){
			var button=$(this),
				selectedSource=sourceSelect.find('>option:selected');
				
			if(selectedSource.length===0){
				return;
			}
			
			targetSelect.append(selectedSource);
		
			e.stopPropagation();
		});
		
		container.delegate('>div:nth-of-type(2)>div:nth-of-type(1)>input:last-child','click',function(e){
			var button=$(this),
				selectedTarget=targetSelect.find('>option:selected');
				
			if(selectedTarget.length===0){
				return;
			}
			
			sourceSelect.append(selectedTarget);
		
			e.stopPropagation();
		});
		
		return this;
	}
	
	function setData(){
		var container=this.eq(0),
			sourceDataList=arguments[0],
			targetDataList=arguments[1],
			
			sourceSelect=container.find('>div:last-child>select').eq(0),
			targetSelect=container.find('>div:last-child>select').eq(1);
			
		sourceSelect.html(_.reduce(sourceDataList,function(m,v){
			return m+'<option value='+v.value+'>'+v.text+'</option>';
		},''));
		targetSelect.html(_.reduce(targetDataList,function(m,v){
			return m+'<option value='+v.value+'>'+v.text+'</option>';
		},''));
		
		return this;
	}
	
	function getSelection(){
		var container=this.eq(0);
		
		return _.reduce(container.find('>div:last-child>select:eq(1)>option'),function(m,v){
			var option=$(v);
			
			m.push({
				value:option.val(),
				text:$.trim(option.text())
			});
			
			return m;
		},[]);
	}
}(jQuery,_));