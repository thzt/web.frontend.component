(function ($) {

    $.pluginManager.filter('relatedSelect', {
        init: filterInit
    });

    function filterInit() {
        var $primary = arguments[0].primary,
            $related = arguments[0].related;

        return [
        {
            primary: $primary,
            related: $related,
            data: arguments[0].data,
            initial: function (data) {
                fillPrimary.call($primary, data);
                fillRelated.call($related, data.Nodes[0].Data.ID, data);
            },
            getSelectedValue: function () {
                var $select = this;

                return $select.val();
            },
            fillRelated: fillRelated
        }];
    }

    //-- private functions --

    function fillPrimary(data) {
        var $primary = this,
            optionHtml = createOptionHtmlFromNodes(data.Nodes);

        $primary.html(optionHtml);
    }

    function fillRelated(value, data) {
        var $related = this,
            selectedNode = _.find(data.Nodes, function (v) {
                return v.Data.ID == value;
            }, ''),
            optionHtml = createOptionHtmlFromNodes(selectedNode.Nodes);

        $related.html(optionHtml);
    }

    function createOptionHtmlFromNodes(nodes) {
        return _.reduce(nodes, function (m, v) {
            return m + '<option value="' + v.Data.ID + '">' + v.Data.Name + '</option>';
        }, '');
    }

} (jQuery));