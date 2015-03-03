(function ($) {

    $.pluginManager.extend('selectItem', {
        init: init
    });

    function init() {
        var $container = this.eq(0),

            data = arguments[0].data,
            success = arguments[0].success,
            click = arguments[0].click;

        $container
            .addClass('thzt_selectitem')
            .delegate('>table>tbody>tr>td:not(:first-child)', 'click', function (e) {
                e.stopPropagation();

                var $td = $(this),
                tdIndex = $td.index(),
                validTdIndex = tdIndex - 1;

                $td.siblings('td').removeClass('thzt_selectitem_selected');
                $td.addClass('thzt_selectitem_selected');

                click.call($td, validTdIndex);
            })
            .find('>table>tbody>tr').append(_.reduce(data, function (memo, item) {
                return memo + '<td data-id="' + item.ID + '">' + item.Name + '</td>';
            }, ''));

        success.call($container);
        return this;
    }
} (jQuery));