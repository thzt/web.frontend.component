(function($){
	
	$.prototype.extend({
		search:search
	});
	
	var staticConfig={
		filter:{
			'':tagNameFilter,
			'#':idFilter,
			'.':classFilter
		},
		searcher:{
			' ':descendantSearcher,
			'>':childrenSearcher
		}
	};
		
	function search(selector){
		var elements=this,
			levelItems=splitLevel(selector,' >'),
			
			result=elements;
			
		levelItems.every(function(levelItem){
			
			//1. searcher
			var level=levelItem.level,
				levelSelector=levelItem.selector,
				levelSearcherResult=staticConfig.searcher[level].call(result);
				
			//2. filter
			var typeItems=splitType(levelSelector,'#.'),
				typeFilterResult=levelSearcherResult;	
				
			typeItems.every(function(typeItem){
				var type=typeItem.type,
					typeSelector=typeItem.selector;
					
				typeFilterResult=staticConfig.filter[type].call(typeFilterResult,typeSelector);				
				return true;
			});
			
			//3. result
			result=typeFilterResult;
			return true;
		});
		
		return result
	}
	
	//private region
	
	//level searcher
	//-------------------------------------------------------------
	
	function childrenSearcher(){
		var elements=this,
			result=[];
		
		[].every.call(elements,function(item){
			var children=item.children;
			
			[].every.call(children,function(child){				
				var isContain=result.some(function(v){
					return v===child;
				});
				
				if(isContain){
					return true;
				}
				
				result.push(child);
				return true;
			});
			
			return true;
		});
		
		return result;
	}
	
	function descendantSearcher(){
		var elements=this;
		
		//todo: get all descendant elements
	}
	
	//type filter
	//-------------------------------------------------------------
	
	function tagNameFilter(tagName){
		var elements=this;
		
		return [].filter.call(elements,function(item){
			var tag=item.tagName;
			
			return tag.toLowerCase()===tagName.toLowerCase();
		});
	}
	
	function idFilter(id){
		var elements=this;
		
		return [].filter.call(elements,function(item){
			var idAttr=item.getAttribute('id');
			
			if(idAttr==null
				||idAttr!==id){
				return false;
			}
			
			return true;
		});
	}
	
	function classFilter(className){
		var elements=this;
		
		return [].filter.call(elements,function(item){
			var classAttr=item.getAttribute('class');
			
			if(classAttr==null){
				return false;
			}
			
			var classList=getMatchResult(classAttr,/ *([^ ]+) */g,function(eachMatch,name){
					return name;
				}),
				isContain=classList.some(function(classItem){
					return classItem===className;
				});		
			
			if(!isContain){
				return false;
			}
			
			return true;
		});
	}
	
	//split
	//-------------------------------------------------------------
	
	//str='tag#id.class'
	//types='#.'
	//splitType('tag#id.class','#.')
	function splitType(str,types){
		var regexpStr='(['+types+']?)([^'+types+']+)',
			regexp=new RegExp(regexpStr,'g'),
			
			result=getMatchResult(str,regexp,function(eachMatch,type,selector){
				return {
					type:type,
					selector:selector
				};
			});
			
		return result;
	}
	
	//str='tag1#id1.class1>tag2#id2.class2 tag3#id3.class3'
	//levels=' >'
	//splitLevel('tag1#id1.class1>tag2#id2.class2 tag3#id3.class3',' >')
	function splitLevel(str,levels){
		str.slice(0,1)!==''&&(str=' '+str);
		
		var regexpStr='(['+levels+']?)([^'+levels+']+)',
			regexp=new RegExp(regexpStr,'g'),
			
			result=getMatchResult(str,regexp,function(eachMatch,level,selector){
				return {
					level:level,
					selector:selector
				};
			});
			
		return result;
	}
	
	//tool
	//-------------------------------------------------------------
	
	function getMatchResult(str,regexp,matchHandler){
		var match,
			result=[];
			
		while((match=regexp.exec(str))!=null){
			result.push(matchHandler.apply(null,match));
		}
		
		return result;
	}
	
}(jQuery));