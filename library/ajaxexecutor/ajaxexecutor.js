//create a executor to execute several ajax task
//executor=$.createAjaxExecutor();

//add task
//executor.add({task:function(){},success:function(){},error:function(){}}).add({...}).execute();

//if a ajax is responsed, its success() will be called
//otherwise its error() will be called, after execute error(), the subsequent task will be delete

//in success() callback, 'return false' mains stop all subsequent task
//other return, will continue execute subsequent task

//if ajax is not responsed for a long time,
//use executor.stop(); will cancel this ajax request, and delete all subsequent task

(function ($) {
    $.createAjaxExecutor = function () {
        return new AjaxExecutor;
    };

    function AjaxExecutor() {
        var executor = this;

        executor.taskCache = [];
        executor.currentXHR = null;

        return executor;
    }

    AjaxExecutor.prototype = {
        constructor: AjaxExecutor,
        add: addAjaxTask,
        execute: executeAjaxTaskList,
        stop: stopAjaxTask
    };

    function addAjaxTask(ajaxTask) {
        var executor = this;

        //add ajaxTask to taskCache
        executor.taskCache.push(ajaxTask);
        return executor;
    }

    function executeAjaxTaskList() {
        var executor = this,
            currentTask = executor.taskCache.shift();

        //all tasks hav been executed
        if (currentTask == null) {
            clearAjaxTaskList.call(executor);
            return;
        }

        //task() will return a xhr wrappered with defer object.
        $.when(executor.currentXHR = currentTask.task()).done(function () {
            var xhrWrapperWithDefer = this;

            //if not set success callback, execute subsequent task
            //if succes() do not return false, execute subsequent task
            if (!currentTask.success || currentTask.success.apply(xhrWrapperWithDefer, arguments) !== false) {
                executor.execute();
                return;
            }

            //other wise, success() return false will clear task list
            clearAjaxTaskList();
        }).fail(function () {
            var xhrWrapperWithDefer = this;

            currentTask.error
                && currentTask.error.apply(xhrWrapperWithDefer, arguments);

            clearAjaxTaskList.call(executor);
        });
    }

    function stopAjaxTask() {
        var executor = this;

        //if ajax is not responsed, abort() will call xhr.fail method.
        //otherwise will do nothing
        executor.currentXHR.abort();
    }

    //clear all object reference
    function clearAjaxTaskList() {
        var executor = this;

        executor.taskCache = [];
        executor.currentXHR = null;
    }
} (jQuery));
