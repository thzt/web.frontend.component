(function (global) {
    global.Condition = Condition;

    function Condition() {
        var instance = this;

        instance.cache = {};
        return this;
    }

    Condition.prototype = {
        constructor: Condition,

        add: addCondition,
        find: findCondition,

        remove: removeCondition
    };

    function addCondition() {
        var instance = this,
            cache = instance.cache,

            index;

        for (index = 0; index < arguments.length - 2; index++) {
            cache = cache[arguments[index]] = cache[arguments[index]] || {};
        }

        cache[arguments[index]] = arguments[arguments.length - 1];
        return this;
    }

    function findCondition() {
        var instance = this,
            cache = instance.cache,

            index;

        for (index = 0; index < arguments.length; index++) {
            cache = cache[arguments[index]];
            if (cache == null) {
                return null;
            }
        }

        return cache;
    }

    function removeCondition() {
        var instance = this,
            cache = instance.cache,

            index;

        for (index = 0; index < arguments.length - 1; index++) {
            cache = cache[arguments[index]];
            if (cache == null) {
                return this;
            }
        }

        cache[arguments[index]] = null;
        return this;
    }
}(window));