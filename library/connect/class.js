(function(global){
    
    var connectPrototype=global.connectPrototype;

	global.Class={
		create:function(p1){
			var Base=function(){};

			Base.prototype=p1;
			Base.prototype.constructor=Base;

			Base.extend=function(p2){
				var Sub=function(){},
					Base=this;

				var prototype=connectPrototype(p2,Base.prototype);
				Sub.prototype=prototype;
				Sub.prototype.constructor=Sub;

				Sub.extend=Base.extend;

				return Sub;
			};

			return Base;
		}
	};

}(window));
