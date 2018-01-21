import React, { Component, PropTypes } from "react";
import { Router, Route, IndexRoute, Link } from "react-router";
import {
  Layout,
  Menu,
  Icon,
  Input,
  LocaleProvider,
  Dropdown,
  Breadcrumb
} from "antd";
import $ from "jquery";
import MakeCancelablePromise from "../../util/cancelfetch";
import { XNavigation } from "../../component";
import { Scrollbars } from "react-custom-scrollbars";
import screenfull from 'screenfull';
import "./mainLayout.less";
import "../../../css/form/form.less";
import "../../../css/common.less";

//国际化
import { IntlProvider, FormattedMessage } from "react-intl";
import Context from "../../util/context";
// import  "../../../node_modules/screenfull/dist/screenfull.js"
const { Header, Sider, Content } = Layout;
const Search = Input.Search;

const menu = (
  <Menu>
    <Menu.Item>
      <a>
        <Icon type="link" />&nbsp;&nbsp;我的账号
      </a>
    </Menu.Item>
    <Menu.Item>
      <a>
        <Icon type="unlock" />&nbsp;&nbsp;密码设置
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        onClick={() => {
          sessionStorage.setItem("token", undefined);
          top.location.href = "login.html";
        }}
      >
        <Icon type="logout" />&nbsp;&nbsp;退出登录
      </a>
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

  // 搜索菜单
  search = value => {
    this.navigation.search(value);
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
              <XNavigation
                ref={e => (this.navigation = e)}
              // menuClick={(icon, title, url) => {
              //   this.refs.worktab.createTab(icon, title, url);
              // }}
              />
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
                <Search
                  placeholder="搜索"
                  style={{ width: 230, margin: 10 }}
                  onSearch={this.search}
                  className="search_menu"
                />
                <Icon type="arrows-alt" onClick={this.screenFull} />
                <div className="right_link">
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
                  padding: 24,
                  minHeight: 280
                }}
              >
                {React.Children.map(this.props.children, function (child) {
                  return <div>{child}</div>;
                })}
              </Content>
            </Layout>
          </Layout>
        </IntlProvider>
      </LocaleProvider>
    );
  }
}
