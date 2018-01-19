import React from 'react';
import { Button, Icon } from 'antd';
import { XAuthorize } from '../index';
import { FormattedMessage } from 'react-intl';
import './stoppageModeFormButton.less'

export default class XStoppageModeFormButton extends React.Component {
    constructor(props) {
        super(props);

    }

    saveClick = (e) => {
        this.props.callbackParentSave(e);
    }
    submitClick = (e) => {
        this.props.callbackParentSubmit(e);
    }
    cancelClick = (e) => {
        this.props.callbackParentCancel(e);
    }
    
    render() {
        return (
            <div className='button-group1'>
                <XAuthorize>
                    <Button id={this.props.page+"_save"} type="primary" className='addBtn' onClick={this.saveClick}><Icon type="plus" /><FormattedMessage id='save' /></Button>
                    <Button id={this.props.page+"_submit"} type="primary" className='delBtn' onClick={this.submitClick}><Icon type="close" /><FormattedMessage id='submit' /></Button>
                    <Button id={this.props.page+"_cancel"} type="primary" className='editBtn' onClick={this.cancelClick}><Icon type="edit" /><FormattedMessage id='cancel' /></Button>
                </XAuthorize>
            </div>
        )
    }
}
