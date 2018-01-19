import React from 'react';
import ReactDOM from 'react-dom';
import { Tree, Icon } from 'antd';
import Request from '../../util/ajax';
const TreeNode = Tree.TreeNode;
export default class XTest extends React.Component {
    constructor(props) {
        super(props); 
    }
    // componentDidMount = () => {
    //     let option = {};
    //     option.url = this.props.url;
    //     option.data = {};
    //     option.success = function (result) {
    //         const data = [];
    //         if ("Success" == result.state) {
    //             result = result.data;
    //             this.setState({
    //                 treeData: result
    //             });
    //             this.props.setTreeData(result);
    //         }
    //     }.bind(this);
    //     Request.connect("evaluation", option);
    // }
    render() {
        const loop = data => data.map((item) => {
            if (item.children && item.children.length) {
                return <TreeNode key={item.key} title={<span><Icon type="folder-open" className="iconName" />{item.title}</span>}>{loop(item.children)}</TreeNode>;
            }
            return <TreeNode key={item.key} title={<span><Icon type="file-excel" className="iconName" />{item.title}</span>} isLeaf />;
        });
        return (
            <Tree draggable onSelect={this.props.getSelection} onRightClick={this.props.onRightClick} >
                {loop(this.props.treeData)}
            </Tree>
        );
    }
}