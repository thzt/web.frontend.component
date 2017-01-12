import React, { Component } from 'react';

const createRefDomComponent = didMount => (class extends Component {
    componentDidMount() {
        return didMount.call(this, this._dom);
    }

    render() {
        return (
            <div className={this.props.className} ref={div => this._dom = div}></div>
        );
    }
});

export default createRefDomComponent;