(function(global){
	global.callFromTail={
		cache:[],
		execute:function(name){
			var obj=this,
				cache=obj.cache,
				i;
				
			if(cache[0].name!==name){
				return obj;
			}
				
			for(i=0;i<cache.length;i++){
				cache[i].fn.call(obj);
			}
			
			return obj;
		},
		extend:function(pairs){
			var obj=this,
				cache=obj.cache;
				
			for(var key in pairs){
				if(!pairs.hasOwnProperty(key)){
					continue;
				}
				
				cache.unshift({
					name:key,
					fn:pairs[key]
				});
				
				obj[key]=(function(k){
					return function(){
						return obj.execute(k);
					};
				}(key));
			}
			
			return obj;
		}
	};
}(window));