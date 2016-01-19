(function(){
	$().bindTemplate('addCase',{
		predicator:function(value){
			var $item=this;

			return $item.is(':text,:password,textarea,select');
		},
		getter:function(){
			var $item=this;

			return $item.val();
		},
		setter:function(value){
			var $item=this;

			$item.val(value);
		}
	});

	$().bindTemplate('addCase',{
		predicator:function(value){
			var $item=this;

			return $item.is(':checkbox,:radio');
		},
		getter:function(){
			var $item=this;

			return $item.is(':checked');
		},
		setter:function(value){
			var $item=this;

			value
				?$item.attr('checked','checked')
				:$item.removeAttr('checked');
		}
	});

	$().bindTemplate('addCase',{
		predicator:function(value){
			var $item=this;

			return true;
		},
		getter:function(){
			var $item=this;

			return $item.html();
		},
		setter:function(value){
			var $item=this;

			$item.html(value);
		}
	});
}());
