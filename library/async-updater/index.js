(() => {
    class AsyncUpdater {
        constructor({ initialState, mergeStrategy }) {
            this._state = initialState;
            this._merge = mergeStrategy;
            this._queue = [];

            this.isAsyncUpdate = false;
        }

        set state(nextState) {
            throw 'Unsupported setter for AsyncUpdater';
        }

        get state() {
            return this._state;
        }

        setState(nextState) {
            if (!this.isAsyncUpdate) {
                this._state = this._merge(this._state, nextState);

                return this;
            }

            this._queue.push(
                (
                    nextState => currentState => this._merge(currentState, nextState)
                )(nextState)
            );

            return this;
        }

        update() {
            this._state = this._queue.reduce((memo, updater) => updater(memo), this._state);
            this._queue = [];

            return this._state;
        }
    }

    window.AsyncUpdater = AsyncUpdater;
})();