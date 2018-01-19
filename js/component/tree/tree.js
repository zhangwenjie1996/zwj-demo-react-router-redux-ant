import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, Input, Tree } from 'antd';

import $ from 'jquery';
const TreeNode = Tree.TreeNode;

//设置叶子节点（  item.isLeaf = true 为叶子节点）
/*
 参数：treeData 异步加载之前的数据
 curkey：当前key string类型eg：'0-0-1' length=5；
 level：树级别（1：两级 2：三级）
 */
// function setLeaf(treeData, curKey, level) {
//   const loopLeaf = (data, lev) => {
//     const l = lev - 1;//递归 l逐级递减
//     data.forEach((item) => {
//       if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 :
//         curKey.indexOf(item.key) !== 0) {
//         return;
//       }
//       if (item.children) {
//         loopLeaf(item.children, l);
//       } else if (l < 1) {
//         item.isLeaf = true;
//       }
//     });
//   };
//   loopLeaf(treeData, level + 1);
// }


export default class XTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            treeData: [],
            info: []
        };
    }


    componentDidMount() {
        $.ajax({
            type: "GET",
            url: "/webapp/json/treeParent.json",
            success: function (result) {
                this.setState({
                    treeData: result
                });

            }.bind(this)
        });

    }

    //生成的树节点
    generateTreeNodes(treeNode) {
        var arr;
        const key = treeNode.props.eventKey;
        if (treeNode.props.isLeaf) {
            return;
        }
        $.ajax({
            type: "GET",
            url: "/webapp/json/treeChild" + key + ".json",
            data: "key=" + key,
            async: false,
            success: function (result) {
                arr = result;
            }
        });
        return arr;
    }
 //获取最新的树数据（绑定上children） 
    /*
     参数：treeData 异步加载之前的数据
     curkey：当前key string类型eg：'0-0-1' length=5；
     child：异步加载的生成的新节点数据即children（generateTreeNodes生成的节点数据）
     level：树级别（1：两级 2：三级）
     */
    getNewTreeData(treeData, curKey, child) {
        const loop = (data) => {
            data.forEach((item) => {
                if (curKey.indexOf(item.key) === 0) {
                    if (item.children) {
                        loop(item.children);
                    } else {
                        item.children = child;
                    }
                }
            });
        };
        loop(treeData);
}
  //异步加载数据
    onLoadData = (treeNode) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const treeData = [...this.state.treeData];
                this.getNewTreeData(treeData, treeNode.props.eventKey, this.generateTreeNodes(treeNode));
                this.setState({ treeData: treeData });
                resolve();
                this.props.callbackParent(treeData);
            }, 100);
        });
    }

    onSelect = (info, e) => {
        this.setState({
            info: info
        });

        this.props.callbackParentInfo(info);
    }
    render() {
        const loop = data => data.map((item) => {
            if (item.children) {
                return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
            }
            return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} />;
        });

        const treeNodes = loop(this.state.treeData);
        return (
            <div className='left-tree'>


                {
                    //     <Button type="primary" className='addBtn' onClick={this.addClick}>增加</Button>
                    // <Button type="ghost" className='delBtn' onClick={this.delClick}>删除</Button>
                    // <Button type="ghost" className='editBtn' onClick={this.editClick}> 编辑 </Button>
                }


                <Tree loadData={this.onLoadData} onSelect={this.onSelect} >
                    {treeNodes}
                </Tree>
            </div>
        );
    }
}

