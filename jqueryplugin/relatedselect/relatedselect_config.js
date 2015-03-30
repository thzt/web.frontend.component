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

                m.push($select.val());
                return m;
            }, []);

        fill.call(selects, data, state);
    }

    function fill(node, state) {
        var selects = this;

        _.each(selects, function ($select, i) {
            var selectedValue = state[i];

            $select.html(_.reduce(node.Nodes, function (m, v) {
                return m + '<option value="' + v.Data.Value + '">' + v.Data.Text + '</option>';
            }, ''));

            node = selectedValue == null
                ? node.Nodes[0]
                : _.find(node.Nodes, function (v) {
                    return v.Data.Value == selectedValue;
                });

            $select.val(node.Data.Value);
        });
    }

} (jQuery));