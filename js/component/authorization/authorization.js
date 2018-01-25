import React from 'react';
import $ from 'jquery';
import Request from '../../util/ajax';

//权限控制功能
export default class XAuthorization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            permission: [], //组件权限信息
            loaded: false    //组件权限信息是否加载
        }
        //权限请求路径
        this.url = "permission/findElementByRoleIdAndMenuId";
    }
// 登陆成功之后 根据登录人角色进行权限设置
    requestPermission() {
        let option = {};
        // permission/element/266/1
        // this.props.page：page页面的id 左侧菜单对应项目的id
        // {
        //                     "id":"266",
        //                     "parent":"264",
        //                     "text":null,
        //                     "children":[

        //                     ],
        //                     "url":"view/hr/post/post.html",
        //                     "iconStyle":null,
        //                     "key":null,
        //                     "title":null,
        //                     "name":"岗位管理",
        //                     "icon":"yelp",
        //                     "processDefinitionKey":""
        //                 }
        option.url = "permission/element/" + this.props.page + "/" + sessionStorage.getItem("roleId"); //显示该角色是否有该页面的权限并且响应的结果permission包含有该页面上的元素按钮权限 类似这种[{id:post_sel},{id:post_add},{id:post_del}]
        console.log("requestPermission","permission/element/" + this.props.page + "/" + sessionStorage.getItem("roleId"))
        option.data = {}
        option.success = function (result) {
            console.log("************************************",result)
            if ("Success" == result.state) {
                this.setState({ permission: result.data, loaded: true });
            } else {
                this.setState({ permission: [], loaded: true });
            }
        }.bind(this);
        Request.connect("rbac", option);
    }

    //给子元素添加权限上下文数据源来传递
    getChildContext() {
        return { permission: this.state.permission };
    }

    render() {
        // let dom;
        // console.log("renderpermission", this.state.permission,this.state.loaded )
        // if (this.state.loaded) {
        //     dom = <div>
        //         {this.props.children}
        //     </div>;
        // }
        // else {
        //     dom = <div>sorry,你当前没有该权限哦</div>;
        //     this.requestPermission();
        // }
        // return dom;
        return    <div>
        {this.props.children}
    </div>;
    }
}

XAuthorization.childContextTypes = {
    permission: React.PropTypes.array
};


// import React from 'react';
// import $ from 'jquery';
// import Request from '../../util/ajax';

// //权限控制功能
// export default class XAuthorization extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             permission: [], //组件权限信息
//             loaded: false    //组件权限信息是否加载
//         }
//         //权限请求路径
//         this.url = "permission/findElementByRoleIdAndMenuId";
//     }

//     requestPermission() {
//         let option = {};
//         option.url = "permission/element/" + this.props.page + "/" + sessionStorage.getItem("roleId");
//         option.data = {}
//         option.success = function (result) {
//             console.log("requestPermission",result)
//             if ("Success" == result.state) {
//                 this.setState({ permission: result.data, loaded: true });
//             } else {
//                 this.setState({ permission: [], loaded: true });
//             }
//         }.bind(this);
//         Request.connect("rbac", option);
//     }

//     //给子元素添加权限上下文数据源来传递
//     getChildContext() {
//         return { permission: this.state.permission };
//     }

//     render() {
//         let dom;
//         if (this.state.loaded) {
//             dom = <div>
//                 {this.props.children}
//             </div>;
//         }
//         else {
//             dom = <div></div>;
//             this.requestPermission();
//         }
//         return dom;
//     }
// }

// XAuthorization.childContextTypes = {
//     permission: React.PropTypes.array
// };

