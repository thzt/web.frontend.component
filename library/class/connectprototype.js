(function(global){
    
    global.connectPrototype=function(p1,p2){
		var T=function(){};
		T.prototype=p2;
		T.prototype.constructor=T;

		return Object.assign(new T,p1);
    };

}(window));
