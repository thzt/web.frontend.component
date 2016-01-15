(function(){
	$.pluginManager.extend('evidenceTree',{
		init:init,
		bindEvent:bindEvent
	});

	var operation={
		addGroup:addGroup,
		deleteGroup:deleteGroup,
		
		addItem:addItem,
		editItem:editItem,
		deleteItem:deleteItem
	};

	function init(){
		var $container=this.eq(0);

		return this;
	}

	function bindEvent(){
		var $container=this.eq(0);

		$container.delegate('input','click',function(e){
			e.stopPropagation();

			var $button=$(this),
				name=$button.attr('data-operation');

			operation[name].call($button);
		});
		
		return this;
	}

	function addGroup(){
		var $button=this,
			$container=$button.closest('table'),
			groupCount=$container.find('>tbody').length,
			name='新建组',

			html='\
                <tbody>\
                    <tr>\
					    <td data-model="['+groupCount+'].groupName" colspan="4">'+name+'</td>\
					    <td>\
						    <input type="button" value="添加项" data-operation="addItem" />\
						    <input type="button" value="删除组" data-operation="deleteGroup" />\
					    </td>\
				    </tr>\
                </tbody>';

		$container.append(html);
	}
	
	function deleteGroup(){
		var $button=this,
			$group=$button.closest('tbody'),
			nextAllGroups=$group.nextAll('tbody');

		nextAllGroups.find('td[data-model]').each(function(){
			var $td=$(this),

				dataModel=$td.attr('data-model'),
				regexp1=/^(\[)(\d+?)(\]\.groupName)/,
				regexp2=/^(\[)(\d+?)(\]\.groups\[\d+?\]\.evidenceItems\[\d+?\]\..+?)$/,
				regexp3=/^(\[)(\d+?)(\]\.groups\[\d+?\]\.evidenceName)$/,
				modifiedDataModel=dataModel.replace(regexp1,function(match,c1,c2,c3){
					return c1+(+c2-1)+c3;
				}).replace(regexp2,function(match,c1,c2,c3){
					return c1+(+c2-1)+c3;
				}).replace(regexp3,function(match,c1,c2,c3){
					return c1+(+c2-1)+c3;
				});

			$td.attr('data-model',modifiedDataModel);
		});
		
		$group.remove();
	}
	
	function addItem(){
		var $button=this,
			$group=$button.closest('tbody'),
			groupIndex=$group.index(),
			itemCount=$group.find('tr[data-item-header]').length,
			
			html='\
                <tr data-item-header>\
					<td data-model="['+groupIndex+'].groups['+itemCount+'].evidenceItems[0].number">x</td>\
					<td data-model="['+groupIndex+'].groups['+itemCount+'].evidenceItems[0].index">x</td>\
					<td data-model="['+groupIndex+'].groups['+itemCount+'].evidenceItems[0].evidence">x</td>\
					<td data-model="['+groupIndex+'].groups['+itemCount+'].evidenceName" rowspan="4">x</td>\
					<td rowspan="4">\
						<input type="button" value="编辑项" data-operation="editItem" />\
						<input type="button" value="删除项" data-operation="deleteItem" />\
					</td>\
				</tr>\
				<tr>\
					<td data-model="['+groupIndex+'].groups['+itemCount+'].evidenceItems[1].number">x</td>\
					<td data-model="['+groupIndex+'].groups['+itemCount+'].evidenceItems[1].index">x</td>\
					<td data-model="['+groupIndex+'].groups['+itemCount+'].evidenceItems[1].evidence">x</td>\
				</tr>\
				<tr>\
					<td data-model="['+groupIndex+'].groups['+itemCount+'].evidenceItems[2].number">x</td>\
					<td data-model="['+groupIndex+'].groups['+itemCount+'].evidenceItems[2].index">x</td>\
					<td data-model="['+groupIndex+'].groups['+itemCount+'].evidenceItems[2].evidence">x</td>\
				</tr>\
				<tr>\
					<td data-model="['+groupIndex+'].groups['+itemCount+'].evidenceItems[3].number">x</td>\
					<td data-model="['+groupIndex+'].groups['+itemCount+'].evidenceItems[3].index">x</td>\
					<td data-model="['+groupIndex+'].groups['+itemCount+'].evidenceItems[3].evidence">x</td>\
				</tr>';

		$group.append(html);
	}
	
	function editItem(){
		var $button=this;

		alert('editItem');
	}
	
	function deleteItem(){
		var $button=this,
			$group=$button.closest('tbody'),
			
			$itemHeader=$button.closest('tr[data-item-header]'),
			itemHeaderIndex=$itemHeader.index(),
			
			$nextItemHeader=$itemHeader.nextAll('tr[data-item-header]').eq(0),
			nextItemHeaderIndex=$nextItemHeader.index(),

			$allTrs=$group.find('>tr');

		nextItemHeaderIndex==-1
			&&(nextItemHeaderIndex=$allTrs.length);

		var nextAllTrs=$allTrs.filter(function(i){
			var $tr=$(this);

			return i>=nextItemHeaderIndex;
		});

		nextAllTrs.find('>td[data-model]').each(function(){
			var $td=$(this),
				dataModel=$td.attr('data-model'),
				regexp1=/^(\[\d+?\]\.groups\[)(\d+?)(\]\.evidenceItems\[\d+?\]\..+?)$/,
				regexp2=/^(\[\d+?\].groups\[)(\d+?)(\]\.evidenceName)$/,
				modifiedDataModel=dataModel.replace(regexp1,function(match,c1,c2,c3){
					return c1+(+c2-1)+c3;
				}).replace(regexp2,function(match,c1,c2,c3){
					return c1+(+c2-1)+c3;
				});

			$td.attr('data-model',modifiedDataModel);
		});

		var $itemTrs=$allTrs.filter(function(i){
			var $tr=$(this);

			return i>=itemHeaderIndex && i<nextItemHeaderIndex;
		});

		$itemTrs.remove();
	}
	
}());
