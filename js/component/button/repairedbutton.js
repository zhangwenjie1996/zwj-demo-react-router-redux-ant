import React from 'react';
import { Button, Icon } from 'antd';
import { XAuthorize } from '../index';
import { FormattedMessage } from 'react-intl';
import './button.less'

export default class XRepairedbutton extends React.Component {
    constructor(props) {
        super(props);

    }

    addClick = (e) => {
        this.props.callbackParentAdd(e);
    }

    consummateClick = (e) =>{
        this.props.callbackParentConsummate(e);
    }

    editClick = (e) => {
        this.props.callbackParentEdit(e);
    }
    delClick = (e) => {
        this.props.callbackParentDel(e);
    }
    
    render() {
        return (
            <div className='button-group'>
                <XAuthorize>
                    <Button style={{display:this.props.hideConsummate==undefined?"inline-block":"none"}} id={this.props.page+"_consummate"} type="primary" className='addBtn' onClick={this.consummateClick}><Icon type="solution" /><FormattedMessage id='consummate' /></Button>
                    <Button style={{display:this.props.hideEdit==undefined?"inline-block":"none"}} id={this.props.page + "_edit"} type="primary" className='editBtn' onClick={this.editClick} ><Icon type="edit" className="iconStyle" /><FormattedMessage id='edit' /></Button>
                    <Button style={{display:this.props.hideDel==undefined?"inline-block":"none"}} id={this.props.page+"_del"} type="primary" className='delBtn' onClick={this.delClick}><Icon type="delete" /><FormattedMessage id='delete' /></Button>
                </XAuthorize>
            </div>
        )
    }
}
