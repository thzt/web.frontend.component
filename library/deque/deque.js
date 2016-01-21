(function(global){

	global.Deque=Deque;

	function Deque(){
		var instance=this;

		instance.cache=[];
		return this;
	}

	Deque.prototype={
		constructor:Deque,
		
		addFirst:function(val){
			var instance=this,
				cache=instance.cache;

			cache.unshift(val);
			return instance;
		},
		addLast:function(val){
			var instance=this,
				cache=instance.cache;

			cache.push(val);
			return instance;
		},
		
		removeFirst:function(){
			var instance=this,
				cache=instance.cache;

			return cache.shift();
		},
		removeLast:function(){
			var instance=this,
				cache=instance.cache;

			return cache.pop();
		},

		reduce:function(fn,acc){
			var instance=this,
				cache=instance.cache;

			return cache.reduce(function(memo,val,index){

				//[].reduce this->window
				//here let fn this->val
				return fn.apply(val,arguments);
			},acc);
		},
		enumerate:function(fn){
			var instance=this,
				cache=instance.cache;

			cache.some(function(val,index){

				//let fn this->val
				var result=fn.apply(val,arguments);
				return result===false;
			});
		}
	};
	
}(window));
