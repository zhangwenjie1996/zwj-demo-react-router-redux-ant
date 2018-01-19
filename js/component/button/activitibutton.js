import React from 'react';
import { Button, Icon, Modal } from 'antd';
import { XAuthorize } from '../index';
import { FormattedMessage } from 'react-intl';
import XIntlProvider from '../intlprovider/intlprovider';
import './button.less';
import $ from 'jquery';
import Request from '../../util/ajax';
import '../../../css/common.less';
export default class XActivitiButton extends XIntlProvider {
    constructor(props) {
        super(props);

    }
    saveClick = (e) => {
        this.props.saveClick(e);
    }

    commitClick = (e) => {
        this.props.commitClick(e);
    }

    cancelClick = (e) => {
        this.props.cancelClick(e);
    }
    rejectClick = (e) => {
        this.props.rejectClick(e);
    }

    render() {
        return (
            <div className='fixedBtn' >
                <XAuthorize>
                    <Button style={{ display: this.props.hideCancel == undefined || this.props.hideCancel == false ? "inline-block" : "none" }} id={this.props.page + "_cancel"}  
                    className='cancelBtn' onClick={this.cancelClick} ><Icon type="close" className="iconStyle" /><FormattedMessage id='cancel' /></Button>
                    <Button style={{ display: this.props.hideSave == undefined || this.props.hideSave == false  ? "inline-block" : "none" }} id={this.props.page + "_save"} type="primary"
                     className='saveBtn' onClick={this.saveClick} ><Icon type="save" className="iconStyle" /><FormattedMessage id='save' /></Button>
                    <Button style={{ display: this.props.hideCommit == undefined || this.props.hideCommit == false  ? "inline-block" : "none" }} id={this.props.page + "_commit"} type="primary" 
                    className='commitBtn' onClick={this.commitClick} ><Icon type="mail" className="iconStyle" /><FormattedMessage id='submit' /></Button>
                    <Button style={{ display: this.props.hideReject == undefined || this.props.hideReject == false  ? "inline-block" : "none" }} id={this.props.page + "_reject"} type="danger"  
                    className='rejectBtn' onClick={this.rejectClick} ><Icon type="close-circle-o" className="iconStyle" /><FormattedMessage id='reject' /></Button>
                </XAuthorize>
            </div>
        )
    }
}
