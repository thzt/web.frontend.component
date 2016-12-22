(function(global){

	global.CyclicItem=CyclicItem;

	function CyclicItem(dataList){
		var instance=this;

		instance.dataList=dataList;
		instance.position=0;
		return this;
	}

	CyclicItem.prototype={
		constructor:CyclicItem,

		getItem:function(count){
			var instance=this,
				dataList=instance.dataList,
				position=instance.position,

				itemList=[];

			for(;;){
				var start=position,
					end=count-itemList.length+start,
					item=dataList.slice(start,end);

				itemList=itemList.concat(item);
				position=(position+item.length)%dataList.length;
				
				if(itemList.length===count){
					break;
				}
			}

			instance.position=position;

			return itemList;
		}
	};
	
}(window));
