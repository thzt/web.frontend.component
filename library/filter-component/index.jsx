import React, { Component } from 'react';

const filterComponent = ({
    component: Comp,
    get: filterGet = v => v,
    set: filterSet = v => v
}) => (class extends Component {
    render() {
        const {value, onChange} = this.props;

        return (
            <Comp value={filterSet(value)} onChange={(...args) => onChange(...filterGet(...args))} />
        );
    }
});

export default filterComponent;