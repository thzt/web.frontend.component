(function ($) {

    $.pluginManager.extend('selectItem', {
        init: init,

        selectValue: selectValue,
        selectIndex: selectIndex,

        getSelectedItem: getSelectedItem,

        check: check
    });

    function init() {
        var $container = this.eq(0),

            data = arguments[0].data;

        $container
            .removeClass('thzt_selectitem')
            .undelegate()
            .find('>table')
            .remove();

        $container
            .addClass('thzt_selectitem')
            .delegate('>table>tbody>tr>td', 'click', function (e) {
                e.stopPropagation();

                var $td = $(this),
                    index = $td.index(),
                    selectedIndex = $td.parent('tr').find('>td.thzt_selectitem_selected').index();

                if (index === selectedIndex) {
                    return;
                }

                $td.siblings('td').removeClass('thzt_selectitem_selected');
                $td.addClass('thzt_selectitem_selected');

                $container.trigger('change', [index]);
            })
            .html('<table><tr>'
                +[].reduce.call(data, function (memo, item) {
                    return memo + '<td data-value="' + item.Value + '">' + item.Text + '</td>';
                }, '')
                +'</tr></table>');

        return this;
    }

    function selectValue() {
        var $container = this.eq(0),
            value = arguments[0].value,

            $allTd = $container.find('>table>tbody>tr>td'),
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

    function selectIndex() {
        var $container = this.eq(0),
            index = arguments[0].index,

            $allTd = $container.find('>table>tbody>tr>td'),
            $selectedTd = $allTd.eq(index);

        $allTd.removeClass('thzt_selectitem_selected');
        $selectedTd.addClass('thzt_selectitem_selected');

        return this;
    }

    function getSelectedItem() {
        var $container = this.eq(0),
            $selectedTd = $container.find('>table>tbody>tr>td.thzt_selectitem_selected'),
            index = $selectedTd.index();

        return {
            Value: $selectedTd.attr('data-value'),
            Text: $selectedTd.text(),
            Index: index
        };
    }

    function check() {
        var $container = this.eq(0),
            index = arguments[0].index;

        $container.find('>table>tbody>tr>td').eq(index).click();
        return this;
    }

} (jQuery));