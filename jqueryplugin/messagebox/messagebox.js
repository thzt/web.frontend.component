(function ($) {
    $.pluginManager.extend('messageBox', {
        init: init
    });

    var messageBox;

    function init() {
        var title = arguments[0].title||'',
            message = arguments[0].message,
			buttonText=arguments[0].buttonText,
            close = arguments[0].close;

        messageBox = $( 
			'<div><div><div>\
				<div>'+title+'</div>\
				<div>'+message+'</div>\
				<div><span>'+buttonText+'</span></div>\
			</div></div></div>'
        )
        .addClass('thzt_messagebox')
        .appendTo('body');
		
		messageBox.delegate('>div>div>div:last-child>span','click',function(e){
			e.stopPropagation();
			
			close&&close();
			messageBox.undelegate().remove();
		});
    }
} (jQuery));