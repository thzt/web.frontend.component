(function($,_){
	$.pluginManager.extend('recordList',{
		scroll:scroll
	});
	
	function scroll(){
		var container=this.eq(0),
			cellWidthList=arguments[0].cellWidthList,
			height=arguments[0].height,
			
			headTrs=container.find('>table>thead>tr'),
			headTds=headTrs.find('>td:visible'),
			
			bodyTrs=container.find('>table>tbody>tr'),
			bodyTds=bodyTrs.find('>td:visible'),
			
			tableBody=container.find('>table>tbody'),
			
			columnCount=headTds.length,
			tdBoderWidth=+headTds.css('border-right-width').slice(0,-2),
			SCROLLBAR_WIDTH=17,
			tableBodyWidth=
				_.reduce(cellWidthList,function(m,v){
					var width=+v.slice(0,-2);
					
					return m+width;
				},0)
				+(columnCount-1)*tdBoderWidth
				+SCROLLBAR_WIDTH
				+'px';
			
		tableBody.css('width',tableBodyWidth);
		tableBody.css('height',height);
			
		headTrs.each(function(){
			var tr=$(this);
			
			tr.find('>td:visible').each(function(i){
				var td=$(this);
			
				td.css('width',cellWidthList[i]);
			});
		});
		bodyTrs.each(function(){
			var tr=$(this);
			
			tr.find('>td:visible').each(function(i){
				var td=$(this);
			
				td.css('width',cellWidthList[i]);
			});
		});
			
		return this;
	}
}(jQuery,_));