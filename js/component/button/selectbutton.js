import React from 'react';
import { Button, Icon, Modal } from 'antd';
import { XAuthorize } from '../index';
import { FormattedMessage } from 'react-intl';
import  XIntlProvider  from '../intlprovider/intlprovider';
import './button.less';
import $ from 'jquery';
import Request from '../../util/ajax';
import '../../../css/common.less';
export default class XSelectButton extends XIntlProvider {
    constructor(props) {
        super(props);

    }
    selClick = (e) => {
        this.props.callbackParentSel(e);
    }
    render() {
        return (
            <div className='button-group'>
                <XAuthorize>
                    <Button id={this.props.page + "_sel"} type="primary" className='selBtn' onClick={this.selClick}><Icon type="eye-o" className="iconStyle"/><FormattedMessage id='select' /></Button>
                </XAuthorize>
            </div>
        )
    }
}
