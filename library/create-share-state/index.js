const createShareState = state => {
    let _state = state;

    const _setState = state => _state = state;
    const _getState = () => _state;

    return {
        share: fn => fn({
            setState: _setState,
            getState: _getState
        })
    };
};

export default createShareState;