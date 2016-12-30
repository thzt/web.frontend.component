const avoidReentry = ({onLock, onRelease, onLocking, event, }) => {
    let isLocked = false;

    return function (...args) {
        const context = this;

        if (isLocked) {
            return onLocking && onLocking.call(context, ...args);
        }

        onLock && onLock.call(context, ...args);
        isLocked = true;

        const releaseLock = () => {
            onRelease && onRelease.call(context, ...args);
            isLocked = false;
        };

        return event(releaseLock).call(context, ...args);
    };
}

export default avoidReentry;