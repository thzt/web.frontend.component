(function(global){

	global.Class={
		extend:extend
	};

	function extend(p){
		var Sub=function(){},
			Super=this;

		Sub.prototype=connectPrototype(p,Super.prototype);
		Sub.prototype.constructor=Sub;

		Sub.extend=extend;

		return Sub;
	}

	function connectPrototype(p1,p2){
		if(p2==null){
			return p1;
		}
		
		var T=function(){};
		T.prototype=p2;
		T.prototype.constructor=T;

		return Object.assign(new T,p1);
    };

}(window));
