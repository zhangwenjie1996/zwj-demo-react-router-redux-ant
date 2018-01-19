import React from 'react';
import { Button, Icon } from 'antd';
import { XAuthorize } from '../index';
import { FormattedMessage } from 'react-intl';
import './button.less'

export default class XStoppagebutton extends React.Component {
    constructor(props) {
        super(props);

    }

    addClick = (e) => {
        this.props.callbackParentAdd(e);
    }

    editClick = (e) => {
        this.props.callbackParentEdit(e);
    }
    delClick = (e) => {
        this.props.callbackParentDel(e);
    }
    transactClick = (e) =>{
        this.props.callbackParenttransact(e)
    }
    render() {
        return (
            <div className='button-group'>
                <XAuthorize>
                    <Button style={{display:this.props.hideAdd==undefined?"inline-block":"none"}} id={this.props.page+"_add"} type="primary" className='addBtn' onClick={this.addClick}><Icon type="plus" /><FormattedMessage id='add' /></Button>
                    <Button style={{display:this.props.hideDel==undefined?"inline-block":"none"}} id={this.props.page+"_del"} type="primary" className='delBtn' onClick={this.delClick}><Icon type="delete" /><FormattedMessage id='delete' /></Button>
                    <Button style={{display:this.props.hideEdit==undefined?"inline-block":"none"}} id={this.props.page+"_edit"} type="primary" className='editBtn' onClick={this.editClick}><Icon type="edit" /><FormattedMessage id='edit' /></Button>
                    <Button style={{display:this.props.hideTran==undefined?"inline-block":"none"}} id={this.props.page+"_transact"} type="primary" className='transactBtn' onClick={this.transactClick}><Icon type="solution" /><FormattedMessage id='transact' /></Button>
                </XAuthorize>
            </div>
        )
    }
}
