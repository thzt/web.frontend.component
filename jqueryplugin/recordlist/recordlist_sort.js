(function ($, _) {
    $.pluginManager.extend('recordList', {
        sort: sort
    });

    function sort() {
        var container = this.eq(0),
            afterSort = arguments[0] && arguments[0].afterSort;

        container.find('>table>thead>tr>td').each(function () {
            var td = $(this),
                canSortThisColumn = td.attr('data-sort') != null;

            if (!canSortThisColumn) {
                return true;
            }

            td.addClass('thzt_recordlist_sort_init');
        });

        container.delegate('>table>thead>tr>td', 'click', function (e) {
            e.stopPropagation();

            var td = $(this),
                columnIndex = td.index(),
                canSortThisColumn = td.attr('data-sort') != null;

            if (!canSortThisColumn) {
                return;
            }

            if (!td.hasClass('thzt_recordlist_sort_ascend')) {
                sortColumn.call(container, {
                    columnIndex: columnIndex
                });

                td.removeClass()
                    .addClass('thzt_recordlist_sort_ascend')
                    .siblings('td')
                    .filter(function () {
                        var td = $(this),
                            canSortThisColumn = td.attr('data-sort') != null;

                        return canSortThisColumn;
                    })
                    .removeClass()
                    .addClass('thzt_recordlist_sort_init');

                afterSort && afterSort();
                return;
            }

            sortColumn.call(container, {
                columnIndex: columnIndex,
                descend: true
            });

            td.removeClass()
                .addClass('thzt_recordlist_sort_descend')
                .siblings('td')
                .filter(function () {
                    var td = $(this),
                        canSortThisColumn = td.attr('data-sort') != null;

                    return canSortThisColumn;
                })
                .removeClass()
                .addClass('thzt_recordlist_sort_init');

            afterSort && afterSort();
        });

        return this;
    }

    function sortColumn() {
        var container = this.eq(0),
            columnIndex = arguments[0].columnIndex,
            descend = arguments[0].descend,

            notEmptyTrs = container.find('>table>tbody>tr').filter(function () {
                var tr = $(this),
                    td = tr.find('>td').eq(columnIndex),
                    key = td.attr('data-key');

                return key != null;
            }),

            sortedTrs = _.sortBy(notEmptyTrs, function (v) {
                var tr = $(v),
                value = tr.find('>td').eq(columnIndex).html().trim();

                return value;
            });

        //if all column have same value
        if ($(sortedTrs).eq(0).find('>td').eq(columnIndex).html().trim() === $(sortedTrs).eq(-1).find('>td').eq(columnIndex).html().trim()) {
            return this;
        }

        var sortedTbodyHtml = (descend ? _.reduceRight : _.reduce)
            (sortedTrs, function (m, v) {
                var tr = $(v),
                    trHtml = tr[0].outerHTML;

                return m + trHtml;
            }, ''),

            pageSize = container.recordList('getPageSize');

        container.recordList('clearDataList');
        container.find('>table>tbody').html(sortedTbodyHtml);
        pageSize && container.recordList('page', pageSize);

        return this;
    }
} (jQuery, _));
    
