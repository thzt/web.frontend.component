let walker = {
    *sequentialWalker() {
        let array = this;

        for (let i = 0; i < array.length; i++) {
            yield array[i];
        }
    },

    *stopWhenErrorWalker() {
        let array = this,
            isCompleted = true;

        for (let i = 0; i < array.length; i++) {
            let result = yield array[i];

            if (result === false) {
                isCompleted = false;
                break;
            }
        }

        return isCompleted;
    }
};

export default walker;