(function ($) {

    $.pluginManager.extend('modalWrapper', {
        alert: alertMessage
    });

    function alertMessage() {
        var title = arguments[0].title,
            message = arguments[0].message,
            buttonStyle=arguments[0].buttonStyle||'btn btn-primary',
            
            yes = arguments[0].yes,

            $container = $('<div></div>').appendTo('body');

        $container
            .modalWrapper('init', {
                width: '500px',
                title: {
                    text: title,
                    closeClick: function(close) {
                        var closeAndRemove = function () {
                            close();

                            //modal dialog will not delete container
                            //alert dialog should delete container
                            $container.remove();
                        };

                        yes.callback
                            ? yes.callback.call(null, closeAndRemove)
                            : closeAndRemove();
                    }
                },
                body: message,
                footer: {
                    html:
                        '<span class="'+buttonStyle+'">\
                            ' + yes.text + '\
                        </span>',
                    selector: '>span',
                    eventType: 'click',
                    handler: function (close) {
                        var $button = $(this);

                        yes.callback
                            && yes.callback.call(null, function () {
                                close();

                                //modal dialog will not delete container
                                //alert dialog should delete container
                                $container.remove();
                            });
                    }
                }
            });

        //modal dialog will not delete container
        //add this handle to delete it.
        $container.delegate('.modal-header>button', 'click', function (e) {
            e.stopPropagation();

            $container.remove();
        });

        $container.modalWrapper('show');
    }

} (jQuery));