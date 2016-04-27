(function(global){

	global.Class={
		extend:extend
	};

	function extend(proto){
		var Super=this,
			Sub;

		Super.prototype!=null
			&&(proto=Object.assign(Object.create(Super.prototype),proto));
		
		Sub=createConstructor(proto);
		Sub.extend=extend;
		
		return Sub;
	}

	function createConstructor(proto){
		var C=function(){};
		
		C.prototype=proto;
		C.prototype.constructor=C;

		return C;
	}

}(window));
