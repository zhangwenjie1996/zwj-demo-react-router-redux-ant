import React from 'react';
import { Button, Icon, Modal } from 'antd';
import { XAuthorize } from '../index';
import { FormattedMessage } from 'react-intl';
import  XIntlProvider  from '../intlprovider/intlprovider';
import './button.less';
import $ from 'jquery';
import Request from '../../util/ajax';
import '../../../css/common.less';
export default class XStoppageStatisicsbutton extends XIntlProvider {
    constructor(props) {
        super(props);

    }
    yearClick = (e) => {
        this.props.callbackParentYear(e);
    }

    monthClick = (e) => {
        this.props.callbackParentMoth(e);
    }

    weekClick = (e) => {
        this.props.callbackParentWeek(e);
    }
    render() {
        return (
            <div className='button-group ' >
                <XAuthorize>
                    <Button style={{display:this.props.hideSel==undefined?"inline-block":"none"}} id={this.props.page + "_year"} type="primary" className='yearBtn' onClick={this.yearClick} ><Icon type="select" className="iconStyle"/><FormattedMessage id='yearSelect' /></Button>               
                    <Button style={{display:this.props.hideAdd==undefined?"inline-block":"none"}} id={this.props.page + "_month"} type="primary" className='monthBtn' onClick={this.monthClick} ><Icon type="plus"  className="iconStyle"/><FormattedMessage id='monthSelect' /></Button>
                    <Button style={{display:this.props.hideDel==undefined?"inline-block":"none"}} id={this.props.page + "_week"} type="primary" className='weekBtn' onClick={this.weekClick} ><Icon type="close"  className="iconStyle"/><FormattedMessage id='weekSelect' /></Button>
                </XAuthorize>
            </div>
        )
    }
}
