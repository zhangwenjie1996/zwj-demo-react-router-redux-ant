import React, { Component } from "react";
import { Modal, Button, Row, Col } from "antd";
import ModalSingleFormInfo from "./modalSingleFormInfo";
import ModalDoubleFormInfo from "./modalDoubleFormInfo";
import ModalQueryTableInfo from "./modalQueryTableInfo";

import ModalUntil from "./modal";
import Draggable, { DraggableCore } from "react-draggable";

export default class ModalBasic extends Component {
  state = {
    visible: false,
    visible2: false,
    visible3: false
  };

  showModal = () => {
    this.setState({
      visible: true,
      visible2: false,
      visible3: false
    });
    // 每次打开模态框 重设按钮状态
    this.refs.encapsulateMod.reset();
  };

  showModal2 = () => {
    this.setState({
      visible: false,
      visible2: true,
      visible3: false
    });
    // 每次打开模态框 重设按钮状态
    this.refs.encapsulateMod2.reset();
  };
  showModal3 = () => {
    this.setState({
      visible: false,
      visible2: false,
      visible3: true
    });
    // 每次打开模态框 重设按钮状态
    this.refs.encapsulateMod3.reset();
  };
  //  模态框保存
  onOk = e => {
    // 设置settimeout 模拟异步请求
    setTimeout(() => {
      let flag = false;
      // if (5 > 1) {
      //   // flag=true 按钮可用
      //   flag = true;
      //   return flag;
      // }
      console.log("点击了确定");
      this.onCancel();
      return flag;
    }, 500);
  };

  // 取消模态框
  onCancel = e => {
    this.setState({
      visible: false,
      visible2: false,
      visible3: false
    });
  };

  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={8} xl={8} className="col-margin">
            <Draggable>
              <div className="form-block">
                <div className="form-demo-title">模态框内单列表单布局</div>
                <Button type="primary" onClick={this.showModal}>
                  打开模态框
                </Button>
                <ModalUntil
                  ref="encapsulateMod"
                  title="模态框内双列表单布局"
                  visible={this.state.visible}
                  onOk={this.onOk}
                  onCancel={this.onCancel}
                >
                  <ModalSingleFormInfo />
                </ModalUntil>
              </div>
            </Draggable>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={8} className="col-margin">
            <Draggable>
              <div className="form-block">
                <div className="form-demo-title">模态框内双列表单布局</div>
                <Button type="primary" onClick={this.showModal2}>
                  打开模态框
                </Button>
                <ModalUntil
                  ref="encapsulateMod2"
                  title="模态框内双列表单布局"
                  visible={this.state.visible2}
                  onOk={this.onOk}
                  onCancel={this.onCancel}
                >
                  <ModalDoubleFormInfo />
                </ModalUntil>
              </div>
            </Draggable>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={8} className="col-margin">
            <Draggable>
              <div className="form-block">
                <div className="form-demo-title">模态框表格查询</div>
                <Button type="primary" onClick={this.showModal3}>
                  打开模态框
                </Button>
                <ModalUntil
                  ref="encapsulateMod3"
                  title="模态框内双列表单布局"
                  visible={this.state.visible3}
                  onOk={this.onOk}
                  onCancel={this.onCancel}
                >
                  <ModalQueryTableInfo />
                </ModalUntil>
              </div>
            </Draggable>
          </Col>
        </Row>
      </div>
    );
  }
}
