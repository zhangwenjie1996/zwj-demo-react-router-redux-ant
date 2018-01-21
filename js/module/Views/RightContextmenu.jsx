import React from "react";
import $ from "jquery";
import { Tabs, Icon, Button, Dropdown, Menu, LocaleProvider } from "antd";
import ArrayFind from "../../util/arrayfind";
import FontAwesome from "react-fontawesome";
const TabPane = Tabs.TabPane;
//import PubSub from 'pubsub-js';
import Event from "../../util/event";
import { XAuthorization, XContextMenu } from "../../component";
//国际化
import { IntlProvider } from "react-intl";
import Context from "../../util/context";
import { FormattedMessage } from "react-intl";
//导航菜单
var p;
let closePanel;
let tabsNode, eTarget;
export default class RightContextmenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            top: null,
            left: null,
            text: ""
        };
    }

    componentDidMount() {
        this.onRightClick()
    }

    componentWillUnmount() {
        delete this.onRightClick
    }
    // 禁选元素的默认右击事件  鼠标按下当前元素给其绑定右击事件
    onRightClick = () => {
        let tabsNode = $(".div")
        let $menutabs = $(".contextmenu");
        tabsNode.bind("contextmenu", function () {
            return false;
        });
        $menutabs.bind("contextmenu", function () {
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
        console.log("type", type, e)
    };

    menuEvent = (item, key, keyPath) => {
        var props = item.item.props;
        this.setState({
            text: props.children.props.children[1]
        });
    }
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
                            <Menu onClick={this.menuEvent}>
                                <Menu.Item>
                                    <a onClick={e => this.onClick("one", e)}>
                                        <Icon type="tag-o" />
                                        选项一
                                   </a>
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item>
                                    <a onClick={e => this.onClick("two", e)}>
                                        <Icon type="tag-o" />
                                        选项二
                                    </a>
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item>
                                    <a onClick={e => this.onClick("three", e)}>
                                        <Icon type="tag-o" />
                                        选项三
                                    </a>
                                </Menu.Item>
                            </Menu>
                        </XContextMenu>
                        <div className="div" style={{ background: "white", padding: 6 ,marginBottom:8}} onClick={this.rightFn}>鼠标右击,弹出面板～</div>
                        <div>{this.state.text}</div>
                    </div>
                </IntlProvider>
            </LocaleProvider>
        );
        return jsx;
    }
}
