(function($,_){
	$.pluginManager.extend('questionEditor',{
		init:init,
		get:getData,
		set:setData
	});
	
	function init(){
		var container=this.eq(0),
			optionDiv=container.find('>div:nth-child(3)');
		
		container.addClass('thzt_questioneditor');
		
		//type radio click
		container.delegate('>div:nth-child(2)>div>input[type=radio]','click',function(e){
			var radio=$(this),
				index=radio.parent('div').index();
				
			index===2
				?optionDiv.hide()
				:optionDiv.show();
			
			e.stopPropagation();
		});
		
		//add
		container.delegate('>div:nth-child(3)>div:nth-child(1)>input[type=button]','click',function(e){
			var button=$(this);
			
			optionDiv.append(
				'<div>\
					<span></span><input type=text required /><input type=button value=上移 /><input type=button value=下移 /><input type=button value=删除 />\
				</div>'
			);
			
			e.stopPropagation();
		});
		
		//move up, move down, delete
		container.delegate('>div:nth-child(3)>div:not(:nth-child(1))>input[type=button]','click',function(e){
			var button=$(this),
				itemDiv=button.parent('div'),
				
				itemCount=itemDiv.parent('div').children('div').length-1;
			
			//children: span text button button button
			switch(button.index()){
				case 2:    //move up
					if(itemDiv.index()===1){
						return;
					}
					
					itemDiv.insertBefore(itemDiv.prev('div'));
					break;
					
				case 3:    //move down
					if(itemDiv.index()===itemCount){
						return;
					}
					
					itemDiv.insertAfter(itemDiv.next('div'));
					break;
					
				case 4:    //delete
					var isOkToDelete=confirm('确定要删除此选项吗？');
					if(!isOkToDelete){
						return;
					}
					
					itemDiv.remove();
					break;
			}
			
			e.stopPropagation();
		});
		
		return this;
	}
	
	function getData(){
		var container=this.eq(0),
			titleTextbox=container.find('>div:nth-child(1)>div>input[type=text]'),
			itemTextboxes=container.find('>div:nth-child(3)>div:not(:nth-child(1))>input[type=text]'),
			
			index=container.find('>div:nth-child(2)>div>:radio:checked').parent('div').index(),
			type=index+1;
		
		if(type===3){
			return {
				title:titleTextbox.val(),
				type:type
			};
		}
		
		return {
			title:titleTextbox.val(),
			type:type,
			option:_.reduce(itemTextboxes,function(m,v){
				var textbox=$(v);
				m.push({
					value:textbox.attr('data-value'),
					text:textbox.val()
				});
				
				return m;
			},[])
		};
	}
	
	function setData(){
		var container=this.eq(0),
			title=arguments[0].title,
			type=+arguments[0].type,
			option=arguments[0].option,
			
			titleTextbox=container.find('>div:nth-child(1)>div>input[type=text]'),
			optionDiv=container.find('>div:nth-child(3)'),
			radios=container.find('>div:nth-child(2)>div>input[type=radio]');
			
		titleTextbox.val(title);
		radios.eq(type-1).attr('checked','checked');
		
		if(type===3){
			return;
		}
		
		optionDiv.show();
		optionDiv.append(_.reduce(option,function(m,v){
			var value=v.value,
				text=v.text;
				
			return m
				+'<div>\
					<span></span><input type=text required data-value="'+value+'" value="'+text+'" /><input type=button value=上移 /><input type=button value=下移 /><input type=button value=删除 />\
				</div>';
		},''));
	}
}(jQuery,_));