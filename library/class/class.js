(function(global){

	global.Class={
		create:function(p1){
			var Base=function(){};

			Base.prototype=p1;
			Base.prototype.constructor=Base;

			Base.extend=function(p2){
				var Sub=function(){},
					Super=this;

				var prototype=connectPrototype(p2,Super.prototype);
				Sub.prototype=prototype;
				Sub.prototype.constructor=Sub;

				Sub.extend=Super.extend;

				return Sub;
			};

			return Base;
		}
	};

	function connectPrototype(p1,p2){
		var T=function(){};
		T.prototype=p2;
		T.prototype.constructor=T;

		return Object.assign(new T,p1);
    };

}(window));
