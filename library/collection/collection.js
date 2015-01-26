(function (global) {
    var Collection = function () {
        var instance = this;

        this.repository = [];
        return this;
    };

    Collection.prototype = {
        constructor: Collection,
        contain: contain,
        add: add,
        remove: remove,
        toArray: toArray,
        count:count
    };

    global.Collection = Collection;

    function contain(value) {
        var instance = this,
            repository = instance.repository,

            isExist = indexOf.call(instance, value) !== -1;

        return isExist;
    }

    function add(value) {
        var instance = this,
            repository = instance.repository;

        repository.push(value);
        return this;
    }

    function remove(value) {
        var instance = this,
            repository = instance.repository,

            index = indexOf.call(instance, value);

        return repository.splice(index, 1);
    }

    function toArray() {
        var instance = this,
            repository = instance.repository;

        var array = [];

        for (var i in repository) {
            if (!repository.hasOwnProperty(i)) {
                continue;
            }

            array.push(repository[i]);
        }

        return array;
    }

    function count() {
        var instance = this,
            repository = instance.repository;

        return repository.length;
    }

    //private region below

    function indexOf(value) {
        var instance = this,
            repository = instance.repository;

        for (var i in repository) {
            if (!repository.hasOwnProperty(i)) {
                continue;
            }

            if (repository[i] === value) {
                return i;
            }
        }

        return -1;
    }
} (this));