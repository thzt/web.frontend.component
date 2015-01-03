(function($,_){
	$.pluginManager.extend('recordList',{
		setDataList:setDataList,
		setOperation:setOperation
	});
	
	function setDataList(){
		var container=this.eq(0),
			dataList=arguments[0],
			
			tbody=container.find('>table>tbody'),
			
			html=_.reduce(dataList,function(m1,v1){
				return m1+'<tr>'
					+_.reduce(v1,function(m2,v2,p2){
						return m2+'<td data-key="'+p2+'">'+v2+'</td>';
					},'')
					+'</tr>';
			},'');
			
		tbody.append(html);
		return this;
	}
	
	function setOperation(){
		var container=this.eq(0),
			commands=arguments[0];
		
		//DOM creation
		container.find('>table>thead>tr').append('<td>操作</td>');
		container.find('>table>tbody>tr').each(function(){
			var tr=$(this);
		
			tr.append('<td>'
				+_.reduce(commands,function(m,v,p){
					return m+'<span data-name="'+p+'">'+p+'</span>'
				},'')
			+'</td>');
		});
		
		//bind event
		container.delegate('>table>tbody>tr>td>span','click',function(e){
			var span=$(this),
				propertyName=span.attr('data-name'),
				callback=commands[propertyName],
				
				tr=span.parent('td').parent('tr');
				
			callback.call(tr);
			
			e.stopPropagation();
		});
		
		return this;
	}
}(jQuery,_));