import React, { Component, PropTypes } from "react";
import { Router, Route, IndexRoute, Link } from "react-router";
import { Layout, Menu, Icon, LocaleProvider, Dropdown, Breadcrumb } from "antd";
import $ from "jquery";
import MakeCancelablePromise from "../../util/cancelfetch";
import { XNavigation, XWorktab } from "../../component";
import { Scrollbars } from "react-custom-scrollbars";
import screenfull from "screenfull";
import "./mainLayout.less";
import "../../../css/form/form.less";
import "../../../css/common.less";

//国际化
import { IntlProvider, FormattedMessage } from "react-intl";
import Context from "../../util/context";
// import  "../../../node_modules/screenfull/dist/screenfull.js"
const { Header, Sider, Content,Footer} = Layout;

const menu = (
  <Menu>
    <Menu.Item>
      <Link>
        <Icon type="link" style={{ marginRight: 6 }} />
        <span>我的账号</span>
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link>
        <Icon type="unlock" style={{ marginRight: 6 }} />
        <span>密码设置</span>
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/login">
        <Icon type="logout" style={{ marginRight: 6 }} />
        <span>退出登录</span>
      </Link>
    </Menu.Item>
  </Menu>
);
export default class MainLayout extends Component {
  //  全屏显示
  screenFull = () => {
    if (screenfull.enabled) {
      screenfull.request();
    }
  };

  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <LocaleProvider locale={new Context().lang.antd}>
        <IntlProvider
          locale={navigator.language}
          messages={new Context().lang.cust}
        >
          <Layout style={{ minHeight: "100vh" }}>
            <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
              width="256"
              className="sider_demo"
            >
              <div className="logo">
                <a href="#/">
                  <img src="./img/admin.jpg" alt="logo" />
                  <h1>ZWJ ADMIN</h1>
                </a>
              </div>
              {this.props.children[0]}
            </Sider>
            <Layout>
              <Header
                style={{ background: "#fff", padding: 0 }}
                className="header_demo"
              >
                <Icon
                  className="i_trigger"
                  type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                  onClick={this.toggle}
                />
                <div className="right_link">
                  <Icon type="arrows-alt" onClick={this.screenFull} />
                  <Dropdown overlay={menu} trigger={["click"]}>
                    <span className="ant-dropdown-link">
                      <span className="ant-avatar ant-avatar-circle ant-avatar-image">
                        <img src="./img/admin.jpg" />
                      </span>
                      <span className="avatar_name">zwj</span>
                    </span>
                  </Dropdown>
                </div>
              </Header>
              <Content
                style={{
                  margin: "24px 16px",
                  minHeight: 280
                }}
              >
                {this.props.children[1]}
                {/* {React.Children.map(this.props.children, function(child) {
                  return <div>{child}</div>;
                })} */}
              </Content>
              <Footer style={{ textAlign: "center" }}>这里是Footer...</Footer>
            </Layout>
          </Layout>
        </IntlProvider>
      </LocaleProvider>
    );
  }
}
