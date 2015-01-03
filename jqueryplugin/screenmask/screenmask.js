(function($){
	$.extend({
		screenMask:(function(){
			var mask;
			
			return {
				show:function(message){				
					mask=mask||$('\
						<div><div><div>\
							<span></span>\
						</div></div></div>\
					').addClass('thzt_screenmask').appendTo('body');
				
					mask.find('>div>div>span').html(message);
					mask.addClass('thzt_screenmask_show');
				},
				hide:function(){
					mask.removeClass('thzt_screenmask_show');
				}
			};
		}())
	});
}(jQuery));