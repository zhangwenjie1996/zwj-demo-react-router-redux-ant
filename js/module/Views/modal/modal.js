import React, { Component } from "react";
import { Modal, Button, Icon} from "antd";
import { FormattedMessage } from "react-intl";
export default class ModalUntil extends Component {
  state = {
    loading: false,
    disabled: false
  };

  // 点击提交保存按钮触发按钮载入状态
  enterLoading = () => {
    // 默认初始点击按钮为加载中，同时禁选
    this.setState({ loading: true, disabled: true });
    // 给一个setTimeout的0
    setTimeout(() => {
      // loading: false, disabled: false 可用
      // loading: true, disabled: true 不可用
      //返回ture时按钮可用 否则返回undefined/false为不可用状态
      this.props.onOk() ? this.reset() : null;
    }, 0);
  };

  //重置按钮为可用状态
  reset = () => {
    this.setState({ loading: false, disabled: false });
    console.log("rest")
  };

  render() {
    console.log("aaaaaaaa",this.state.loading,this.state.disabled)
    
    const { title, visible,  onCancel } = this.props;
    return (
      <Modal
        maskClosable={false}
        width={750}
        title={title}
        visible={visible} 
        onCancel={onCancel}
        footer={[
          <Button key="cancel" type="ghost" onClick={onCancel}>
            <Icon type="close" />
            <FormattedMessage id="cancel" />
          </Button>,
          <Button
            key="ok"
            type="primary"
            style={{ display: visible }}
            loading={this.state.loading}
            onClick={this.enterLoading}
            disabled={this.state.disabled}
          >
            <Icon type="save" />
            <FormattedMessage id="save" />
          </Button>
        ]}
      >
        {this.props.children}
      </Modal>
    );
  }
}
