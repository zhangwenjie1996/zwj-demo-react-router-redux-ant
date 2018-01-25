import React from "react";
import { Menu, Icon, Spin, Button, Breadcrumb,Input } from "antd";
import $ from "jquery";
import Request from "../../util/ajax";
import FontAwesome from "react-fontawesome";
import "../../../css/common.less";
import MakeCancelablePromise from "../../util/cancelfetch";
import { Router, Route, IndexRoute, Link } from "react-router";
const SubMenu = Menu.SubMenu;
const Search = Input.Search;
let ary = [],
  openKeysArray = [];

//导航菜单
export default class XNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      selectedKeys: [],
      openKeys: [],
      collapsed: false
    };
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  componentDidMount() {
    this.loadNavigation();
  }

  componentWillUnmount() {
    this.cancelable ? this.cancelable.cancel() : null;
  }

  loadNavigation = () => {
    // option.url = "menu/5/" + roleId;//roleId根据角色id进入不同菜单权限
    let url = MakeCancelablePromise.nodeserver + "menu";
    this.cancelable = MakeCancelablePromise.makeCancelable(fetch(url));
    this.cancelable.promise
      .then(response => response.json())
      .then(json => {
        console.log("json", json);
        this.setState({
          loading: false,
          data: json.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  // 根据menuid 依次向上遍历查询父节点
  searchData2 = (data, id) => {
    if (!data || !data.length) return;
    var stack = [];
    //先将第一层节点放入栈
    for (var i = 0, len = data.length; i < len; i++) {
      stack.push(data[i]);
    }
    var item;
    while (stack.length) {
      item = stack.shift();
      if (item.id == id) {
        return item.parent;
      } else {
        if (item.children && item.children.length) {
          stack = stack.concat(item.children);
        }
      }
    }
  };

  // 去重
  duplicateRemoval = data => {
    let obj = {};
    for (var i = 0; i < data.length; i++) {
      var cur = data[i];
      if (obj[cur] == cur) {
        data[i] = data[data.length - 1];
        data.length--;
        i--;
        continue;
      }
      obj[cur] = cur;
    }
    return data;
  };

  // 搜索查找输入名称对应的标识 selectedKeys
  searchData = (data, value) => {
    data.map((item, index, input) => {
      if (item.name.indexOf(value) !== -1) {
        var id = item.id;
        ary.push(id);
        var searchMenuIds = [];
        // 深层遍历循环，找到其上层所有parent，存放searchMenuIds中
        while (true) {
          id = this.searchData2(this.state.data, id);
          searchMenuIds.unshift(id);
          if (id == "#") {
            break;
          }
        }
        searchMenuIds =
          searchMenuIds.length == 1 && searchMenuIds[0] == "#"
            ? [item.id]
            : searchMenuIds;
        openKeysArray = openKeysArray.concat(searchMenuIds);
        // return;
      }

      if (item.children.length > 0) {
        this.searchData(item.children, value);
      }
    });

    this.setState({
      selectedKeys: ary,
      openKeys: this.duplicateRemoval(openKeysArray)
    });
  };

  // Menu菜单搜索
  search = value => {
    ary = [];
    openKeysArray = [];
    this.searchData(this.state.data, value);
  };

  // SubMenu 展开/关闭的回调
  onOpenChange = key => {
    this.setState({
      openKeys: key
    });
  };

  createNodes = data => {
    var menu = data.map(menu => {
      if (menu.children && menu.children.length > 0) {
        var children = this.createNodes(menu.children);
        return (
          <SubMenu
            key={menu.id}
            title={
              <span>
                <Icon type={menu.icon} />
                <span>{menu.name}</span>
              </span>
            }
          >
            {children}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item
            key={menu.id}
            data-name={menu.name}
            data-url={menu.url}
            data-icon={menu.icon}
          >
            <Link to={menu.url}>
              <Icon type={menu.icon} />
              <span>{menu.name}</span>
            </Link>
          </Menu.Item>
        );
      }
    });
    return menu;
  };

  render() {
    if (this.state.loading)
      //如果加载数据中，不渲染
      return (
        <Spin
          size="large"
          tip="Loading..."
          spinning={this.state.loading}
          className="spin"
        />
      );
    else {
      var nodes = this.createNodes(this.state.data);
      return (
        <div className="search_menu">
          <Search
            placeholder="搜索"
            style={{ width: 230, margin: 10 }}
            onSearch={this.search}
            className="search_menu"
          />
          <Menu
            selectedKeys={this.state.selectedKeys}
            openKeys={this.state.openKeys}
            mode="inline"
            theme="dark"
            onOpenChange={this.onOpenChange}
            onClick={item => {
              this.setState({
                selectedKeys: [item.key]
              });
              console.log("props", item);

              var props = item.item.props;
              this.props.menuClick(
                props["data-icon"],
                props["data-name"],
                props["data-url"]
              );
            }}
          >
            {nodes}
          </Menu>
        </div>
      );
    }
  }
}
