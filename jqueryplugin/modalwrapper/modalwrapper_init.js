(function ($) {

    $.pluginManager.extend('modalWrapper', {
        init: init,
        show: show,
        close: close
    });

    function init() {
        var $container = this.eq(0),
            width = arguments[0].width,
            title = arguments[0].title,
            body = arguments[0].body,
            footer = arguments[0].footer;

        $container.html(
            '<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
                <div class="modal-dialog">\
                    <div class="modal-content">\
                        <div class="modal-header">\
                            <button type="button" class="close" aria-hidden="true">\
                                &times;\
                            </button>\
                            <h4 class="modal-title">'
                                + title.text
                            + '</h4>\
                        </div>\
                        <div class="modal-body">'
                            + body
                        + '</div>\
                        <div class="modal-footer">'
                            + footer.html
                        + '</div>\
                    </div>\
                </div>\
            </div>'
        );

        $container
            .delegate('.modal-footer' + footer.selector, footer.eventType, function (e) {
                e.stopPropagation();

                footer.handler.call(this, Function.prototype.bind.call(close, $container));
            })
            .delegate('.modal-header>button', 'click', function (e) {
                e.stopPropagation();

                title.closeClick
                    ? title.closeClick.call($container, Function.prototype.bind.call(close, $container))
                    : close.call($container);
            });

        width
            && $container.find('.modal-dialog').css('width', width);

        return this;
    }

    function close() {
        var $container = this.eq(0);

        $container.undelegate().children().remove();

        //trick: otherwise document can't scroll
        $('body').removeClass('modal-open');

        return this;

    }

    function show() {
        var $container = this.eq(0);

        //prohibit click margin to close
        //prohibit push Esc to close
        $container.find('>div').modal({
            backdrop: 'static',
            keyboard: false
        });

        $container.find('>div').modal('show');
        return this;
    }

} (jQuery));