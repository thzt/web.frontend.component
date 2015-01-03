(function($,_){
	$.pluginManager.extend('recordList',{
		addDataList:addDataList,
		initOperation:initOperation,
		fillOperation:fillOperation
	});
	
	function addDataList(){
		var container=this.eq(0),
			dataList=arguments[0];
			
		container
			.find('>table>tbody')
			.prepend(_.reduceRight(dataList,function(m1,v1){
				return m1+'<tr>'
					+_.reduce(v1,function(m2,v2,p2){
						return m2+'<td data-key="'+p2+'">'+v2+'</td>';
					},'')
					+'</tr>';
			},''));
			
		return this;
	}
	
	function initOperation(){
		var container=this.eq(0);
			
		container.find('>table>thead>tr').append('<td>操作</td>');		
		return this;
	}
	
	function fillOperation(){
		var container=this.eq(0),
			getCommands=arguments[0],
			columnCount=container.find('>table>thead>tr>td').length;
			
		container.find('>table>tbody>tr').each(function(){
			var tr=$(this);
			
			if(tr.children('td').length==columnCount){
				return true;
			}
			
			var commands=getCommands.call(tr);
			
			if(commands==null){
				tr.append('<td></td>');
				return true;
			}
				
			tr.append('<td>'
				+_.reduce(commands,function(m,v,p){
					return m+'<span data-name='+p+'>'+p+'</span>';
				},'')
				+'</td>');
				
			tr.find('>td>span').each(function(){
				var span=$(this),
					propertyName=span.attr('data-name'),
					callback=commands[propertyName];
					
				span.click(function(){
					callback.call(tr);
				});
			});
		});
		
		return this;
	}
}(jQuery,_));