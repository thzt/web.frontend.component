(function($,_){
	$.pluginManager.extend('selectTable',{
		init:init,
		get:get,
		select:select,
		filter:filter
	});
	
	function init(){
		var container=this.eq(0),
			titleList=arguments[0].titleList,
			dataList=arguments[0].dataList,
			cellWidthList=arguments[0].cellWidthList,
			height=arguments[0].height;
			
		initTable.call(container,titleList,dataList,cellWidthList,height);
		initEvent.call(container);
		
		return this;
	}
	
	function get(){
		var container=this.eq(0);
		
		return _.reduce(container.find('>table>tbody>tr'),function(m1,v1){
			var tr=$(v1),
				checkbox=tr.find('>td:first-child>input[type=checkbox]'),
				isChecked=checkbox.is(':checked');
				
			if(!isChecked){
				return m1;
			}
			
			m1.push(_.reduce(tr.find('>td:not(:first-child)'),function(m2,v2){
				var td=$(v2),
					key=td.attr('data-key'),
					value=$.trim(td.text());
					
				m2[key]=value;
				
				return m2;
			},{}));
			
			return m1;
		},[]);
	}
	
	function select(){
		var container=this.eq(0),
		
			key=arguments[0].key,
			dataList=arguments[0].dataList;
			
		container.find('>table>tbody>tr').each(function(){
			var tr=$(this),
				tdText=$.trim($(_.find(tr.find('>td'),function(v){
					var td=$(v),
						tdKey=td.attr('data-key');
					
					return tdKey===key;
				})).text());
				
			tr.find('>td:first-child>input[type=checkbox]')[0].checked=(_.indexOf(dataList,tdText)!==-1);
		});
		
		setHeadCheckboxState.call(container);
	}
	
	function filter(){
		var container=this.eq(0),
		
			key=arguments[0].key,
			text=arguments[0].text;
			
		container.find('>table>tbody>tr').each(function(){
			var tr=$(this),
				tdText=$.trim($(_.find(tr.find('>td'),function(v){
					var td=$(v),
						tdKey=td.attr('data-key');
					
					return tdKey===key;
				})).text());
				
			tdText.indexOf(text)===-1
				?tr.hide()
				:tr.show();
		});
			
		setHeadCheckboxState.call(container);
			
		return this;
	}
	
	function initTable(titleList,dataList,cellWidthList,height){
		var container=this;
		
		titleList.unshift('<input type=checkbox />');
		
		container
			.recordList('init',titleList)
			.recordList('addDataList',_.reduce(dataList,function(m1,v1){
				var initData={};
				initData['']='<input type=checkbox />';
			
				m1.unshift(_.reduce(v1,function(m2,v2,p2){
					m2[p2]=v2;
					
					return m2;
				},initData));
				
				return m1;
			},[]))
			.recordList('scroll',{
				cellWidthList:cellWidthList,
				height:height
			});
	}
	
	function initEvent(){
		var container=this;
	
		container.delegate('>table>thead>tr>td>input[type=checkbox]','click',function(e){
			var clickCheckbox=$(this),
				isChecked=clickCheckbox.is(':checked'),
				checkboxInTableBody=container.find('>table>tbody>tr>td>input[type=checkbox]:visible');
				
			checkboxInTableBody.each(function(){
				var checkbox=$(this);
				
				//here use html property, not use $.fn.attr/$.fn.removeAttr
				//because jQuery bug, only the first time can set checkbox checked.
				checkbox[0].checked=isChecked;
			});
				
			e.stopPropagation();
		});
		
		container.delegate('>table>tbody>tr>td>input[type=checkbox]','click',function(e){
			var clickCheckbox=$(this);
			
			setHeadCheckboxState.call(container);
				
			e.stopPropagation();
		});
	}
	
	function setHeadCheckboxState(){
		var container=this,
		
			checkboxInTableHead=container.find('>table>thead>tr>td>input[type=checkbox]'),
			checkboxInTableBody=container.find('>table>tbody>tr>td>input[type=checkbox]:visible'),
			checkedCheckbox=checkboxInTableBody.filter(function(){
				var checkbox=$(this),
					isChecked=checkbox.is(':checked');
					
				return isChecked;
			});
				
		checkboxInTableHead[0].checked=
			(checkedCheckbox.length===checkboxInTableBody.length)
			&&(checkboxInTableBody.length!==0);
			
		checkboxInTableHead[0].indeterminate=
			(checkedCheckbox.length!==checkboxInTableBody.length)
			&&(checkedCheckbox.length!==0);
	}
}(jQuery,_));