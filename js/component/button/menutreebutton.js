import React from 'react';
import { Button, Icon, Modal } from 'antd';
import { FormattedMessage } from 'react-intl';
import './button.less';
import $ from 'jquery';
import '../../../css/common.less';



export default class MenuTree extends React.Component {

    constructor(props) {
        super(props);
        // 设置右击树菜单的显隐
        this.state = {
            clickProps: {
                display: 'none',
            }
        }
        document.body.addEventListener("click", this.fn, false);
    }

    fn = (e) => {
        e = e || window.event;
        this.no()
    }

    no = () => {
        this.setState({
            clickProps: {
                display: 'none',
            }
        })
    }

    // 判断显隐状态改变是否更新
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.clickProps !== this.state.clickProps
    }

    // 新的状态赋值
    componentDidUpdate(nextProps, nextState) {
        this.state.clickProps = nextState.clickProps
    }


    // 右击树菜单显隐的控制
    changeDisplay = () => {
        'inline-block' == this.state.clickProps.display ? this.setState({ clickProps: { display: 'none' } }) : this.setState({ clickProps: { display: 'inline-block' } });
    }
    selClick = (e) => {
        this.no();
        this.props.callbackParentSel(e);
    }

    addClick = (e) => {
        this.no();
        this.props.callbackParentAdd(e);
    }
    delClick = (e) => {
        this.no();
        this.props.callbackParentDel(e);

    }
    editClick = (e) => {
        this.no();
        this.props.callbackParentEdit(e);
    }


    render() {
        
        return (
            <div className='menuTree' style={{
                display: this.state.clickProps.display,
                top: this.props.top,
                left: this.props.left
            }} >
                <p id={this.props.page + "_sel"} style={{display:this.props.showFind==undefined?"block":"none"}} type="primary" className='selBtn' onClick={this.selClick}><Icon type="eye-o" className="iconStyle" /><FormattedMessage id='view' /></p>
                <p id={this.props.page + "_add"} type="primary" style={{display:this.props.showAdd==undefined?"block":"none"}} className='addBtn' onClick={this.addClick}><Icon type="plus" className="iconStyle" /><FormattedMessage id='add' /></p>
                <p id={this.props.page + "_del"} type="primary" className='delBtn' onClick={this.delClick}><Icon type="delete" className="iconStyle" /><FormattedMessage id='delete' /></p>
                <p id={this.props.page + "_edit"} type="primary" className='editBtn' onClick={this.editClick}><Icon type="edit" className="iconStyle" /><FormattedMessage id='edit' /></p>

            </div>
        )
    }
}

