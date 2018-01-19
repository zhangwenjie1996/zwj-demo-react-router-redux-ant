import React from "react";
import { Menu, Dropdown, Icon } from "antd";
import { Router, Route, IndexRoute, Link } from "react-router";
import "./banner.less";

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

// 左侧logo区域
const ProfilePic = ({ logo, text }) => (
  <div className="nav-logo">
    <Link to="/webapp/index.html" style={{ color: "white" }}>
      <img className="logo" src={logo} />
      <span className="logo-text">{text}</span>
    </Link>
  </div>
);

// 右侧用户区域
const ProfileLink = ({ name }) => (
  <div className="nav-link">
    <Dropdown overlay={menu}>
      <a className="link" href={"#" + name}>
        <img className="nav-user-photo" src="./img/defaultuser2.jpg" />
        <span className="welcome">
          <span>欢迎 </span>
          <span>{name}</span>
        </span>
        <Icon type="down" />
      </a>
    </Dropdown>
  </div>
);

const XBanner = ({ logo, text, name }) => (
  <div className="nav-content">
    <ProfilePic logo={logo} text={text} />
    <ProfileLink name={name} />
  </div>
);

export default XBanner;
