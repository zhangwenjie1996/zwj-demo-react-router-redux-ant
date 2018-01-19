
import React from 'react';
import ArrayFind from '../../util/arrayfind';

// 配置的是页面中的按钮元素等的权限 按钮是否隐藏 不可操作 或者正常显示等等
//权限控制功能 
export default class XAuthorize extends React.Component {
    constructor(props) {
        super(props);
    }

    //验证元素的权限。0：隐藏，1：不可操作，2：正常
    verifyElement(id) {
        let state = 2;//显示状态默认为2：正常展示
        let match= ArrayFind.find([...this.context.permission], item => { return item.id == id })
        
        if (match)
            state = match.permission;
        console.log("this.context.permission",this.context.permission,match,state)
        
        return state;
    }

    //验证元素权限
    verify = (element) => {
        let children = element.props.children;
        let properties, newElement, newChildren;
        console.log("verify",element,children )
        
        return React.Children.map(children, (child, index) => {
            //如果非对象直接返回
            if (!(child instanceof Object)) {
                return child;
            }

            //验证元素权限
            let state = this.verifyElement(child.props.id); //post_sel

            //大于0说明可以展示，否则移除元素
            if (state > 0) {
                properties = {};
                if (state == 2) {   //需要设置不可操作
                    properties.disabled = true;
                }
                
                //验证子元素
                if (child.props && child.props.children) {
                    newChildren = this.verify(child);
                    properties.children = newChildren;
                }
                if (child.type instanceof Object)//只有子元素为自定义元素的时候才赋值权限列表
                    newElement = React.cloneElement(child, properties); //cloneElement给钙元素克隆进去新的属性 
                else
                    newElement = child;
                    console.log("newElement",newElement) 
                    // {$$typeof: Symbol(react.element), type: ƒ, key: null, ref: null, props: {…}, …}
                    // $$typeof
                    // :
                    // Symbol(react.element)
                    // key
                    // :
                    // null
                    // props
                    // :
                    // {id: "view", values: {…}, disabled: true}
                    // ref
                    // :
                    // null
                    // type
                    // :
                    // ƒ FormattedMessage(props, context)
                    // _owner
                    // :
                    // ReactCompositeComponentWrapper {_currentElement: {…}, _rootNodeID: 0, _compositeType: 0, _instance: XOperateButton, _hostParent: ReactDOMComponent, …}
                    // _store
                    // :
                    // {validated: false}
                return newElement;
            }
            else
                return null;
        });
    }


    render() {
        let dom;
        if (this.context.permission) {
            let children = this.verify(this);
            dom = <div>
                {children}
            </div>;
        }
        else {
            dom = <div></div>;
        }
        return dom;
    }
}

XAuthorize.contextTypes = {
    permission: React.PropTypes.array
}
// import React from 'react';
// import ArrayFind from '../../util/arrayfind';

// //权限控制功能
// export default class XAuthorize extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     //验证元素的权限。0：隐藏，1：不可操作，2：正常
//     verifyElement(id) {
//         let state = 2;//显示状态默认为2：正常展示
//         let match= ArrayFind.find([...this.context.permission], item => { return item.id == id })
//         if (match)
//             state = match.permission;
//         return state;
//     }

//     //验证元素权限
//     verify = (element) => {
//         let children = element.props.children;
//         let properties, newElement, newChildren;
//         return React.Children.map(children, (child, index) => {
//             //如果非对象直接返回
//             if (!(child instanceof Object)) {
//                 return child;
//             }

//             //验证元素权限
//             let state = this.verifyElement(child.props.id);

//             //大于0说明可以展示，否则移除元素
//             if (state > 0) {
//                 properties = {};
//                 if (state == 1) {   //需要设置不可操作
//                     properties.disabled = true;
//                 }

//                 //验证子元素
//                 if (child.props && child.props.children) {
//                     newChildren = this.verify(child);
//                     properties.children = newChildren;
//                 }
//                 if (child.type instanceof Object)//只有子元素为自定义元素的时候才赋值权限列表
//                     newElement = React.cloneElement(child, properties);
//                 else
//                     newElement = child;
//                 return newElement;
//             }
//             else
//                 return null;
//         });
//     }


//     render() {
//         let dom;
//         if (this.context.permission) {
//             let children = this.verify(this);
//             dom = <div>
//                 {children}
//             </div>;
//         }
//         else {
//             dom = <div></div>;
//         }
//         return dom;
//     }
// }

// XAuthorize.contextTypes = {
//     permission: React.PropTypes.array
// }