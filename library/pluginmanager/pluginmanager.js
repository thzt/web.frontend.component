//version 1.1.0

(function ($) {

    $.extend({
        pluginManager: {
            extend: extend,
            config: config
        }
    });

    //create a plugin / extend an existing plugin
    //$.pluginManager.extend(pluginName, {
    //    operationName1: function () { },
    //    operationName2: function () { },
    //    ...
    //});
    function extend(pluginName, operationSet) {
        cache[pluginName] == null
            && createNewPlugin(pluginName);

        addOperationsToPlugin(pluginName, operationSet);
        return this;
    }

    //add default parameters for plugin
    //$.pluginManager.config(pluginName, {
    //    operationName1: [defaultArguments[0], defaultArguments[1], ...],
    //    operationName2: [defaultArguments[0], defaultArguments[1], ...],
    //    ...
    //});
    function config(pluginName, allOperationsConfig) {
        for (var operationName in allOperationsConfig) {
            if (!allOperationsConfig.hasOwnProperty(operationName)) {
                continue;
            }

            cache[pluginName][operationName].configs = allOperationsConfig[operationName];
        }

        return this;
    }

    //-- private fields --

    //cache = {
    //    pluginName: {
    //        operationName: {
    //            operation: function () { },
    //            configs: []
    //        }
    //    }
    //};
    var cache = {};

    //-- private functions --

    function createNewPlugin(pluginName) {
        var plugin = {};

        //extend a plugin to jQuery
        plugin[pluginName] = function(operationName) {
            var $selector = this,
                currentArguments = [].slice.call(arguments, 1),
                mergedArguments = mergeConfigsAndCurrentArguments.call(currentArguments, pluginName, operationName),

                operation = cache[pluginName][operationName].operation;

            return operation.apply($selector, mergedArguments);
        };
        $.prototype.extend(plugin);

        //creat a repository to this plugin in cache
        cache[pluginName] = {};
    }

    function mergeConfigsAndCurrentArguments(pluginName, operationName) {
        var currentArguments = this,
            configs = cache[pluginName][operationName].configs,

            length = Math.max(currentArguments.length, configs.length),
            index,

            mergedArguments = [];

        for (index = 0; index < length; index++) {
            if (currentArguments[index] == null) {
                mergedArguments[index] = configs[index];
                continue;
            }

            if (configs[index] == null) {
                mergedArguments[index] = currentArguments[index];
                continue;
            }

            if (isNotObject(currentArguments[index]) || isNotObject(configs[index])) {
                mergedArguments[index] = currentArguments[index];
                continue;
            }

            mergedArguments[index] = $.extend(configs[index], currentArguments[index]);
        }

        return mergedArguments;
    }

    function addOperationsToPlugin(pluginName, operationSet) {
        for (var operationName in operationSet) {
            if (!operationSet.hasOwnProperty(operationName)) {
                continue;
            }

            cache[pluginName][operationName] = {
                operation: operationSet[operationName],
                configs: []
            };
        }
    }

    function isNotObject(value) {
        return typeof (value) !== 'object';
    }

} (jQuery));