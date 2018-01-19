import React, { Component, PropTypes } from 'react';
import ToggleButton from './childComp';
export default class MyContainer extends React.Component {
    constructor() {
        super();
        this.state = { message: false }
    }

    onChildChanged = (newState) => {
        this.setState({
            message: newState
        });
    }

    render() {
        return (
            <div>
                <div>Your message: {this.state.message}</div>
                <button onClick={() => { this.onChildChanged("asfasdfasd") } }>父点击</button>
                <ToggleButton text="Toggle me"
                    initialChecked={this.state.asd}
                    callbackParent={this.onChildChanged}
                    />
            </div>
        );
    }
}

