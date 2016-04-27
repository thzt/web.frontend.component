(function(global){

	global.connectConstructor=function(C1,C2){
		var T=function(){};
		T.prototype=C2.prototype;
		T.prototype.constructor=T;

		C1.prototype=Object.assign(new T,C1.prototype);
		C1.prototype.constructor=C1;
	};
	
}(window));
