(function ($) {

    $.pluginManager.filter('relatedSelect', {
        init: filterInit
    });

    function filterInit() {
        var selects = arguments[0].selects,
            data = arguments[0].data;

        return [{
            selects: selects,
            data: data,
            initial: initial,
            change: change
        }];
    }

    //-- private functions --

    function initial(data) {
        var selects = this;

        fill.call(selects, data, []);
    }

    function change(data, index) {
        var selects = this,
            state = _.reduce(selects, function (m, v, i) {
                var $select = v;

                if (i > index) {
                    return m;
                }

                var selectedValue = $select.selectItem('getSelectedItem').Value;

                m.push(selectedValue);
                return m;
            }, []);

        fill.call(selects, data, state);
    }

    function fill(node, state) {
        var selects = this;

        _.each(selects, function ($select, i) {
            var selectedValue = state[i],
                data = _.map(node.Nodes, function (v) {
                    return v.Data;
                });

            $select.selectItem('init', {
                data: data
            });

            node = selectedValue == null
                ? node.Nodes[0]
                : _.find(node.Nodes, function (v) {
                    return v.Data.Value == selectedValue;
                });

            $select.selectItem('selectValue', {
                value: selectedValue
            });
        });
    }

} (jQuery));