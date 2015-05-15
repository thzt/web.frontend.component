(function (global) {

    global.stateMachine = {
        create: function (json) {
            return new StateMachine(json);
        }
    };

    function StateMachine(json) {
        var instance = this;

        instance.json = json;
        instance.currentStateName = null;
    }

    StateMachine.prototype = {
        constructor: StateMachine,

        setState: setState,
        getState: getState,

        feed: feed
    };

    function setState(stateName) {
        var instance = this;

        instance.currentStateName = stateName;
        return this;
    }

    function getState() {
        var instance = this;

        return instance.currentStateName;
    }

    function feed(value) {
        var instance = this,
            json = instance.json,
            currentStateName = instance.currentStateName,

            shiftActions = json[currentStateName];

        for (var i = 0; i < shiftActions.length; i++) {
            var item = shiftActions[i],
                receive = item['Receive'],
                action = item['Action'],
                gotoState = item['Goto'];

            if (receive !== value) {
                continue;
            }

            if (json[gotoState] == null) {
                return null;
            }

            instance.currentStateName = gotoState;
            return action;
        }

        return null;
    }

} (window));