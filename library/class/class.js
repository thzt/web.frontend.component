(function(global){

	global.Class={
		extend:extend
	};

	function extend(proto){
		var Super=this,
			protoChainHead=connectPrototype(proto,Super.prototype),
			Sub=createConstructor(protoChainHead);

		Sub.extend=extend;
		return Sub;
	}

	function connectPrototype(p1,p2){
		if(p2==null){
			return p1;
		}

		var C=createConstructor(p2);
		return Object.assign(new C,p1);
    }

	function createConstructor(proto){
		var C=function(){};
		
		C.prototype=proto;
		C.prototype.constructor=C;

		return C;
	}

}(window));
