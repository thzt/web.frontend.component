(function ($, _) {
    $.pluginManager.extend('recordList', {
        getDataList: getDataList
    });

    function getDataList() {
        var container = this.eq(0),
            tbody = container.find('>table>tbody');

        return _.reduce(tbody.find('>tr'), function (m1, v1) {
            var tr = $(v1),
                trObject = _.reduce(tr.find('>td'), function (m2, v2) {
                    var td = $(v2),
                        key = td.attr('data-key'),
                        value = $.trim(td.html());

                    //ignore not contain data-key td
                    if (key == null) {
                        return m2;
                    }

                    //if has contain data-key td, then set m2 not null
                    m2 == null
                        && (m2 = {});

                    m2[key] = value;
                    return m2;
                }, null);

            //if all td not contain data-key, then not save to array
            if (trObject == null) {
                return m1;
            }

            m1.push(trObject);
            return m1;
        }, []);
    }
} (jQuery, _));