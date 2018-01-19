import { message, Modal } from 'antd';
import React from 'react';
import $ from 'jquery';
import { FormattedMessage } from 'react-intl';
import XIntlProvider from '../component/intlprovider/intlprovider';

message.config({
  duration: 5,
});

export default class XInfo extends XIntlProvider {

    constructor(props) {
        super(props);
    }
    //Message消:msg提示消息内容
    msgInfo = (msg) => {
        message.info(this.context.intl.formatMessage({ id: msg }));
    }

    msgSuccess = (msg) => {
        message.success(this.context.intl.formatMessage({ id: msg }));
    }
    msgError = (msg) => {
        message.error(this.context.intl.formatMessage({ id: msg }));
    }

    msgWarning = (msg) => {
        message.warning(this.context.intl.formatMessage({ id: msg }));
    }

    //Model消息

    //确认框
    modConfirm = (msg, method) => {
        Modal.confirm({
            title: this.context.intl.formatMessage({ id: "affirm" }),
            content: this.context.intl.formatMessage({ id: msg }) + "?",
            onOk: method,
        });
    }

    //成功模态框
    modSuccess = (msg) => {
        Modal.success({
            title: this.context.intl.formatMessage({ id: "remind" }),
            content: this.context.intl.formatMessage({ id: msg }) + "。",
        });
    }
    //失败模态框
    modErrors = (msg) => {
        Modal.error({
            title: this.context.intl.formatMessage({ id: "remind" }),
            content: this.context.intl.formatMessage({ id: msg }) + "。",
        });
    }
    //警告模态框
    modWarning = (msg) => {
        Modal.warning({
            title: this.context.intl.formatMessage({ id: "remind" }),
            content: this.context.intl.formatMessage({ id: msg }) + "。",
        });
    }

    getWarning = (msg) => {
        let warn = this.context.intl.formatMessage({ id: msg })
        return warn;
    }




    //未实现国际化提示消息
    amsgInfo = (msg) => {
        message.info(msg);
    }

    amsgSuccess = (msg) => {
        message.success(msg);
    }
    amsgError = (msg) => {
        message.error( msg);
    }

    amsgWarning = (msg) => {
        message.warning(msg);
    }

    amodConfirm = (msg, method) => {
        Modal.confirm({
            title: this.context.intl.formatMessage({ id: "affirm" }),
            content: msg + "?",
            onOk: method,
        });
    }

    //成功模态框
    amodSuccess = (msg) => {
        Modal.success({
            title: this.context.intl.formatMessage({ id: "remind" }),
            content: msg + "。",
        });
    }
    //失败模态框
    amodErrors = (msg) => {
        Modal.error({
            title: this.context.intl.formatMessage({ id: "remind" }),
            content: msg + "。",
        });
    }
    //警告模态框
    amodWarning = (msg) => {
        Modal.warning({
            title: this.context.intl.formatMessage({ id: "remind" }),
            content: msg + "。",
        });
    }


    render() {
        return (
            <div></div>
        )
    }
}
