﻿(function ($) {

    $.pluginManager.extend('modalWrapper', {
        confirm: confirm
    });

    function confirm() {
        var title = arguments[0].title,
            message = arguments[0].message,
            buttonStyle=arguments[0].buttonStyle||'btn btn-primary',

            yes = arguments[0].yes,
            no = arguments[0].no,

            $container = $('<div></div>').appendTo('body');
            
        //modal dialog will not delete container
        //add this handle to delete it.
        $container.delegate('.modal-header>button', 'click', function (e) {
            e.stopPropagation();

            $container.remove();
        });

        $container
            .modalWrapper('init', {
                title: {
                    text: title,
                    closeClick: function(close) {
                        var closeAndRemove = function () {
                            close();

                            //modal dialog will not delete container
                            //alert dialog should delete container
                            $container.remove();
                        };

                        no.callback
                            ? no.callback.call(null, closeAndRemove)
                            : closeAndRemove();
                    }
                },
                body: message,
                footer: {
                    html:
                         '<span class="'+buttonStyle+'">\
                            ' + yes.text + '\
                        </span>\
                        <span class="'+buttonStyle+'">\
                            ' + no.text + '\
                        </span>',
                    selector: '>span',
                    eventType: 'click',
                    handler: function (close) {
                        var $button = $(this),
                            index = $button.index(),

                            closeAndRemove = function () {
                                close();

                                //modal dialog will not delete container
                                //alert dialog should delete container
                                $container.remove();
                            };

                        switch (index) {
                            case 0:
                                yes.callback
                                    ? yes.callback.call(null, closeAndRemove)
                                    : closeAndRemove();
                                break;

                            case 1:
                                no.callback
                                    && no.callback.call(null, closeAndRemove);
                                break;
                        };
                    }
                }
            });
            
        return this;
    }

} (jQuery));