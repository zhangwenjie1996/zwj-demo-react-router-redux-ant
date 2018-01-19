import React from "react";
import { Button, Icon  } from "antd";
import { FormattedMessage } from "react-intl";
import $ from "jquery";
import "../../../css/common.less";
import "./contextmenu.less";

export default class XContextMenu extends React.Component {
  constructor(props) {
    super(props);
    // 设置右击树菜单的显隐
    this.state = {
      clickProps: {
        display: "none"
      }
    };
    document.body.addEventListener("click", this.fn, false);
  }

  fn = e => {
    e = e || window.event;
    this.no();
  };

  no = () => {
    this.setState({
      clickProps: {
        display: "none"
      }
    });
  };

  // 判断显隐状态改变是否更新
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.clickProps !== this.state.clickProps;
  }

  // 新的状态赋值
  componentDidUpdate(nextProps, nextState) {
    this.state.clickProps = nextState.clickProps;
  }

  // 右击树菜单显隐的控制
  changeDisplay = () => {
    "inline-block" == this.state.clickProps.display
      ? this.setState({ clickProps: { display: "none" } })
      : this.setState({ clickProps: { display: "inline-block" } });
  };

  render() {
    return (
      <div
        className="contextmenu"
        style={{
          display: this.state.clickProps.display,
          top: this.props.top,
          left: this.props.left,
          width:this.props.width||"auto",
          height:this.props.height||"auto",
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
