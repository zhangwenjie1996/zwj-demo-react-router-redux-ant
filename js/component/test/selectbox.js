import React, { Component, PropTypes } from 'react';
export default class SelectBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' }
    }
    handleChange = (e) => {
          this.setState({ value: e.target.value });
    }

    render() {
        return (
            <div>
                <select onChange={this.handleChange} value={this.state.value}>
                    <option value="javascript" key={1}>JavaScript</option>
                    <option value="Angular2" key={2}>Angular2</option>
                    <option value="React" key={3}>React</option>
                </select>
                <h1>{this.state.value}</h1> </div>)
    }
}