(function ($) {

    $.pluginManager.extend('selectItem', {
        init: init,
        selectValue: selectValue,
        getSelectedItem: getSelectedItem
    });

    function init() {
        var $container = this.eq(0),

            data = arguments[0].data;

        $container
            .removeClass('thzt_selectitem')
            .undelegate()
            .find('>table>tbody>tr>td:not(:first-child)')
            .remove();

        $container
            .addClass('thzt_selectitem')
            .delegate('>table>tbody>tr>td:not(:first-child)', 'click', function (e) {
                e.stopPropagation();

                var $td = $(this),
                    index = $td.index(),
                    validTdIndex = index - 1;

                $td.siblings('td').removeClass('thzt_selectitem_selected');
                $td.addClass('thzt_selectitem_selected');

                $container.trigger('change', [validTdIndex]);
            })
            .find('>table>tbody>tr').append(_.reduce(data, function (memo, item) {
                return memo + '<td data-value="' + item.Value + '">' + item.Text + '</td>';
            }, ''));

        return this;
    }

    function selectValue() {
        var $container = this.eq(0),
            value = arguments[0].value,

            $allTd = $container.find('>table>tbody>tr>td:not(:first-child)'),
            $selectedTd = $allTd.filter(function () {
                var $td = $(this),
                    val = $td.attr('data-value');

                return val == value;
            });

        $allTd.removeClass('thzt_selectitem_selected');

        if ($selectedTd.length !== 0) {
            $selectedTd.addClass('thzt_selectitem_selected');
            return this;
        }

        $allTd.eq(0).addClass('thzt_selectitem_selected');
        return this;
    }

    function getSelectedItem() {
        var $container = this.eq(0),
            $selectedTd = $container.find('>table>tbody>tr>td.thzt_selectitem_selected');

        return {
            Value: $selectedTd.attr('data-value'),
            Text: $selectedTd.text()
        };
    }

} (jQuery));