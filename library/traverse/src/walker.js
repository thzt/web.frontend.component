let walker = {
    *sequentialWalker() {
        let array = this;

        for (let i = 0; i < array.length; i++) {
            yield array[i];
        }
    },

    *stopWhenErrorWalker() {
        let array = this;

        for (let i = 0; i < array.length; i++) {
            let result = yield array[i];
            
            if (result === false) {
                break;
            }
        }
    }
};

export default walker;