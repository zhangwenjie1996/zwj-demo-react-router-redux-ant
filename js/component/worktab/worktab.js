import React from "react";
import $ from "jquery";
import XTabcontent from "./tabcontent";
import { Tabs, Icon, Button, Dropdown, Menu, LocaleProvider } from "antd";
import ArrayFind from "../../util/arrayfind";
import FontAwesome from "react-fontawesome";
const TabPane = Tabs.TabPane;
//import PubSub from 'pubsub-js';
import Event from "../../util/event";
import { XAuthorization ,XContextMenu } from "../../component";
//国际化
import { IntlProvider } from "react-intl";
import Context from "../../util/context";
import { FormattedMessage } from "react-intl";
//导航菜单
var p;
let closePanel;
let tabsNode, eTarget;
export default class XWorktab extends React.Component {
  constructor(props) {
    super(props);
    const panels = [
      {
        icon: "windows",
        title: "欢迎",
        content: <XTabcontent url="./view/welcome.html" />,
        key: this.tabKey("欢迎")
      }
    ];
    this.state = {
      panels: panels,
      activeKey: panels[0].key,
      top: null,
      left: null
    };
    p = this.state.panels;
  }

  //标签编辑事件，用来触发移除标签方法
  onEdit = (targetKey, action) => {
    this[action](targetKey); //调用对应方法
  };

  //移除标签
  remove = targetKey => {
    if (targetKey == "tab欢迎") {
      return;
    }
    let activeKey = this.state.activeKey;
    let lastIndex = 0;
    this.state.panels.forEach((panel, i) => {
      if (panel.key === targetKey) {
        closePanel = panel;
        if (i != 0) lastIndex = i - 1;
      }
    });
    const panels = this.state.panels.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panels[lastIndex].key;
    }
    this.setState({ panels, activeKey });
  };

  //点击标签
  onTabChange = activeKey => {
    this.setState({ activeKey });
  };
  //创建新的标签
  createTab = (icon, title, url) => {
    const panels = this.state.panels;
    const key = this.tabKey(title);
    let match = ArrayFind.find(panels, item => {
      return item.key == key;
    });
    if (match)
      //如果已经打开，则激活
      this.setState({ activeKey: key });
    else {
      panels.push({
        icon: icon,
        title: title,
        content: <XTabcontent className="abc" url={url} base={this} />,
        key: key
      });
      this.setState({ panels, activeKey: key }, () => {
        tabsNode = $(".ant-tabs-tab");
        this.onRightClick();
      });
    }
  };

  // 禁选元素的默认右击事件  鼠标按下当前元素给其绑定右击事件
  onRightClick = () => {
    let tabpane = $(".abc body");
    tabpane.off("click");
    tabpane.on("click", function() {
      console.log("888");
    });

    let $menutabs = $(".contextmenu");
    tabsNode.bind("contextmenu", function() {
      return false;
    });
    $menutabs.bind("contextmenu", function() {
      return false;
    });
    tabsNode.off("mousedown");
    tabsNode.on("mousedown", this.rightFn);
  };

  // tabs右击事件
  rightFn = e => {
    //右键为3
    if (3 == e.which) {
      eTarget = $(e.target);
      this.setState({
        top: e.pageY,
        left: e.pageX
      });
      this.refs.menutabs.changeDisplay();
    } else if (1 == e.which) {
      //左键为1
    }
  };

  onClick = (type, e) => {
    this.refs.menutabs.no();
    let eTargetKey = this.tabKey($.trim(eTarget.text()));
    let { activeKey, panels } = this.state;
    const panelsDefault = [
      {
        icon: "windows",
        title: "欢迎",
        content: <XTabcontent url="./view/welcome.html" />,
        key: this.tabKey("欢迎")
      }
    ];
    // 先清除第一个欢迎页卡
    // panels.splice(0, 1);
    if (type == "other") {
      panels.map((panel, i, arr) => {
        if (panel.key === eTargetKey) {
          if (i !== 0) {
            panels = panelsDefault.concat(arr.splice(i, 1));
          } else {
            panels = arr.splice(i, 1);
          }
          return false;
        }
      });
      activeKey = panels[panels.length - 1].key;
    } else if (type == "right") {
      panels.map((panel, i, arr) => {
        if (panel.key === eTargetKey && i < arr.length - 1) {
          arr.splice(i + 1);
          return false;
        }
      });
      activeKey = panels[panels.length - 1].key;
    } else if (type == "left") {
      panels.map((panel, i, arr) => {
        if (panel.key === eTargetKey && i > 0) {
          panels = panelsDefault.concat(arr.splice(i - arr.length));
          return false;
        }
      });
      activeKey = panels.length <= 1 ? panels[0].key : panels[1].key;
    } else {
      if (closePanel) {
        panels = panels.concat(closePanel);
        activeKey = panels[panels.length - 1].key;
      }
    }
    this.setState({ panels: panels, activeKey: activeKey });
  };

  tabKey(title) {
    return `tab${title}`;
  }

  getChildContext() {
    return { color: "purple" };
  }

  // 去重
  duplicateRemoval = data => {
    let obj = {};
    for (var i = 0; i < data.length; i++) {
      var cur = data[i].key;
      if (obj[cur] == cur) {
        data[i] = data[data.length - 1];
        data.length--;
        i--;
        continue;
      }
      obj[cur] = cur;
    }
  };

  render() {
    var jsx = (
      <LocaleProvider locale={new Context().lang.antd}>
        <IntlProvider
          locale={navigator.language}
          messages={new Context().lang.cust}
        >
          <div>
            <XContextMenu
              ref="menutabs"
              onClick={this.onClick}
              top={this.state.top}
              left={this.state.left}
            >
              <Menu>
                <Menu.Item>
                  <a onClick={e => this.onClick("other", e)}>
                    <Icon type="tag-o" />
                    <FormattedMessage id="closeOtherTabs" />
                  </a>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item>
                  <a onClick={e => this.onClick("right", e)}>
                    <Icon type="tag-o" />
                    <FormattedMessage id="closeRightTabs" />
                  </a>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item>
                  <a onClick={e => this.onClick("left", e)}>
                    <Icon type="tag-o" />
                    <FormattedMessage id="closeLeftTabs" />
                  </a>
                </Menu.Item>
              </Menu>
            </XContextMenu>
            <Tabs
              ref="tabs"
              hideAdd
              onChange={this.onTabChange}
              activeKey={this.state.activeKey}
              type="editable-card"
              onEdit={this.onEdit}
            >
              {this.state.panels.map(pane => (
                <TabPane
                  tab={
                    <span>
                      <FontAwesome
                        style={{ marginRight: 4, fontSize: 15 }}
                        name={pane.icon}
                        size={"2x"}
                        color="#52C0FE"
                      />{" "}
                      {pane.title}
                    </span>
                  }
                  key={pane.key}
                >
                  {pane.content}
                </TabPane>
              ))}
            </Tabs>
          </div>
        </IntlProvider>
      </LocaleProvider>
    );
    return jsx;
  }
}

XWorktab.childContextTypes = {
  color: React.PropTypes.string
};
