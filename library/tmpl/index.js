(function(global){

	global.tmpl=tmpl;

	function tmpl(source,data){
		return source.replace(/<%([^%]+?)%>/g,function($0,$1){
			return new Function('obj','\
                with(obj){\
                    return '+$1+';\
                }\
            ')(data);
		});
	}
	
}(window));
