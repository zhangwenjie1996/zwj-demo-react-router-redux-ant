import React from 'react';
import { Button } from 'antd';
import { XAuthorize } from '../index';
import { FormattedMessage } from 'react-intl';
import XIntlProvider from '../intlprovider/intlprovider';
import './button.less';
import $ from 'jquery';
import Request from '../../util/ajax';
import '../../../css/common.less';
export default class XSubmitButton extends React.Component {
    state = {
        loading: false,
        disabled: false
    }

    // 点击提交保存按钮触发按钮载入状态 
    enterLoading = () => {
        // 默认初始点击按钮为加载中，同时禁选
        this.setState({ loading: true, disabled: true });
        // 给一个setTimeout的0
        setTimeout(() => {
            // loading: false, disabled: false 可用
            // loading: true, disabled: true 不可用
            //返回ture时按钮可用 否则返回undefined/false为不可用状态
            this.props.onClick() ? this.reset() : null;
        }, 0);
    }

    //重置按钮为可用状态  
    reset= () => {
        this.setState({ loading: false, disabled: false });
    }

    render() {
        return (
            <Button type="primary" icon="save" loading={this.state.loading} onClick={this.enterLoading} disabled={this.state.disabled}>
                <FormattedMessage id="save" />
            </Button>
        );
    }
}
