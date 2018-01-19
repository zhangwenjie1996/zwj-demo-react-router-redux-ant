import React, { Component, PropTypes } from 'react';
export default class ToggleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: ""}
  }

  change = (value) => {
    this.setState({
      message: value
    })
  }

  render() {
    // 从【父组件】获取的值
    var text = this.props.text;
    // 组件自身的状态数据
    var checked = this.state.checked;
    var isChecked = this.state.checked ? 'yes' : 'no';
    return (
      <div>
        {this.state.message}
        <input onChange={e => { this.state.message = e.target.value } } />
        <button onClick={() => { this.props.callbackParent(this.change) } }>子点击</button>
      </div>
    );
  }
}

