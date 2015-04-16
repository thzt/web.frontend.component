//version 1.1.2

(function ($) {

    $.extend({
        pluginManager: {
            extend: extend,
            filter: filter,

            remove: remove
        }
    });

    //create a plugin / extend an existing plugin
    //$.pluginManager.extend(pluginName, {
    //    operationName1: function () { },
    //    operationName2: function () { },
    //    ...
    //});
    function extend(pluginName, operationSet) {
        addOperationSetToCache(pluginName, operationSet);
        createPlugin(pluginName);

        return this;
    }

    //add parameter filter for plugin
    //$.pluginManager.filter(pluginName, {
    //    operationName1: function () { },
    //    operationName2: function () { },
    //    ...
    //});
    function filter(pluginName, allOperationsFilter) {
        for (var operationName in allOperationsFilter) {
            if (!allOperationsFilter.hasOwnProperty(operationName)) {
                continue;
            }

            cache[pluginName] = cache[pluginName] || {};
            cache[pluginName][operationName] = cache[pluginName][operationName] || {};

            cache[pluginName][operationName].filter = allOperationsFilter[operationName];
        }

        return this;
    }

    function remove(pluginName) {
        cache[pluginName] = null;
        $.prototype[pluginName] = null;

        return this;
    }

    //-- private fields --

    //cache = {
    //    pluginName: {
    //        operationName: {
    //            operation: function () { },
    //            filter: function () { }
    //        }
    //    }
    //};
    var cache = {};

    //-- private functions --

    function addOperationSetToCache(pluginName, operationSet) {
        for (var operationName in operationSet) {
            if (!operationSet.hasOwnProperty(operationName)) {
                continue;
            }

            cache[pluginName] = cache[pluginName] || {};
            cache[pluginName][operationName] = cache[pluginName][operationName] || {};

            cache[pluginName][operationName].operation = operationSet[operationName];
        }
    }

    function createPlugin(pluginName) {
        var plugin = {};

        plugin[pluginName] = function (operationName) {
            var $selector = this,
                operation = cache[pluginName][operationName].operation,
                currentArguments = [].slice.call(arguments, 1),
                operationFilter = cache[pluginName][operationName].filter;

            if (operationFilter == null) {
                return operation.apply($selector, currentArguments);
            }

            var filteredArguments = operationFilter.apply($selector, currentArguments);
            return operation.apply($selector, filteredArguments);
        };

        $.prototype.extend(plugin);
    }

} (jQuery));