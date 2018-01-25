import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  Collapse,
  Row,
  Col,
  Button,
  Form,
  Icon,
  Input,
  Select,
  Modal,
  TreeSelect,
  DatePicker
} from "antd";
import { XIntlProvider } from "../../../../component";
import { FormattedMessage } from "react-intl";
import XInfo from "../../../../util/infomation";
import Request from "../../../../util/ajax";
import moment from "moment";
import "../../../../../css/common.less";
const { TextArea } = Input;
const TreeNode = TreeSelect.TreeNode;
const FormItem = Form.Item;
const Panel = Collapse.Panel;
/**
 * 供应商(输入框)模态框
 */
const Option = Select.Option;
class XApplyFrom extends XIntlProvider {
  constructor(props) {
    super(props);
    this.state = {
      applyInvoice: {}
    };
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    const formItemLayout2 = {
      labelCol: {
        sm: { span: 8 },
        md: { span: 8 },
        lg: { span: 4 },
        xl: { span: 4 }
      },
      wrapperCol: {
        sm: { span: 16 },
        md: { span: 16 },
        lg: { span: 20 },
        xl: { span: 20 }
      }
    };
    const { applyInvoice } = this.props;

    return (
      <div>
        <XInfo ref="msg" />
        <Form
          ref="form"
          style={{ overflow: "hidden",padding:"20px 100px 20px 80px" }}
         
        >
          <Col
            sm={{ span: 16, offset: 2 }}
            md={{ span: 16, offset: 2 }}
            lg={{ span: 12, offset: 0 }}
            xl={{ span: 6, offset: 0 }}
            style={{ display: "none" }}
          >
            <FormItem {...formItemLayout} label="applyInvoiceID" hasFeedback>
              {getFieldDecorator("applyInvoiceID", {
                initialValue: applyInvoice.applyInvoiceID
              })(<Input type="text" placeholder=" " />)}
            </FormItem>
            <FormItem {...formItemLayout} label="applyInvoiceState" hasFeedback>
              {getFieldDecorator("applyInvoiceState", {
                initialValue: applyInvoice.applyInvoiceState
              })(<Input type="text" placeholder=" " />)}
            </FormItem>
            <FormItem {...formItemLayout} label="orginID" hasFeedback>
              {getFieldDecorator("orginID", {
                initialValue: applyInvoice.orginID
              })(<Input type="text" placeholder=" " />)}
            </FormItem>
            <FormItem {...formItemLayout} label="createrID" hasFeedback>
              {getFieldDecorator("createrID", {
                initialValue: applyInvoice.createrID
              })(<Input type="text" placeholder=" " />)}
            </FormItem>
            <FormItem {...formItemLayout} label="approvalID" hasFeedback>
              {getFieldDecorator("approvalID", {
                initialValue: applyInvoice.approvalID
              })(<Input type="text" placeholder=" " />)}
            </FormItem>
          </Col>
          <Col
            sm={{ span: 16, offset: 2 }}
            md={{ span: 16, offset: 2 }}
            lg={{ span: 12, offset: 0 }}
            xl={{ span: 6, offset: 0 }}
          >
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="applyInvoiceNo" />}
              hasFeedback
            >
              {getFieldDecorator("applyInvoiceNo", {
                initialValue: applyInvoice.applyInvoiceNo
              })(<Input disabled placeholder=" " type="text" />)}
            </FormItem>
          </Col>
          <Col
            sm={{ span: 16, offset: 2 }}
            md={{ span: 16, offset: 2 }}
            lg={{ span: 12, offset: 0 }}
            xl={{ span: 6, offset: 0 }}
          >
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="applyInvoiceName" />}
              hasFeedback
            >
              {getFieldDecorator("applyInvoiceName", {
                initialValue: applyInvoice.applyInvoiceName,
                rules: [
                  {
                    required: true,
                    message: this.context.intl.formatMessage({ id: "required" })
                  }
                ]
              })(<Input placeholder=" " type="text" />)}
            </FormItem>
          </Col>
          <Col
            sm={{ span: 16, offset: 2 }}
            md={{ span: 16, offset: 2 }}
            lg={{ span: 12, offset: 0 }}
            xl={{ span: 6, offset: 0 }}
          >
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="applyOrginName" />}
              hasFeedback
            >
              {getFieldDecorator("orginName", {
                initialValue: applyInvoice.orginName,
                rules: [
                  {
                    required: true,
                    message: this.context.intl.formatMessage({ id: "required" })
                  }
                ]
              })(<Input placeholder=" " type="text" />)}
            </FormItem>
          </Col>
          <Col
            sm={{ span: 16, offset: 2 }}
            md={{ span: 16, offset: 2 }}
            lg={{ span: 12, offset: 0 }}
            xl={{ span: 6, offset: 0 }}
          >
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="arrivalTime" />}
              hasFeedback
            >
              {getFieldDecorator("arrivalTime", {
                initialValue: applyInvoice.arrivalTime,
                rules: [
                  {
                    required: true,
                    message: this.context.intl.formatMessage({ id: "required" })
                  }
                ]
              })(
                <DatePicker
                  allowClear
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  disabledDate={end => {
                    const start = moment(
                      applyInvoice.creatTime,
                      "YYYY-MM-DD HH:mm:ss"
                    );
                    if (!end || !start) {
                      return false;
                    }
                    return end.valueOf() <= start.valueOf();
                  }}
                />
              )}
            </FormItem>
          </Col>
          <Col
            sm={{ span: 16, offset: 2 }}
            md={{ span: 16, offset: 2 }}
            lg={{ span: 12, offset: 0 }}
            xl={{ span: 6, offset: 0 }}
          >
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="creatName" />}
              hasFeedback
            >
              {getFieldDecorator("createrName", {
                initialValue: applyInvoice.createrName
              })(<Input disabled placeholder=" " type="text" />)}
            </FormItem>
          </Col>
          <Col
            sm={{ span: 16, offset: 2 }}
            md={{ span: 16, offset: 2 }}
            lg={{ span: 12, offset: 0 }}
            xl={{ span: 6, offset: 0 }}
          >
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="creatTime" />}
              hasFeedback
            >
              {getFieldDecorator("creatTime", {
                initialValue: applyInvoice.creatTime
              })(<Input disabled placeholder=" " type="text" />)}
            </FormItem>
          </Col>
          <Col
            sm={{ span: 16, offset: 4 }}
            md={{ span: 16, offset: 2 }}
            lg={{ span: 12, offset: 0 }}
            xl={{ span: 6, offset: 0 }}
            style={{
              display: applyInvoice.approvalName == undefined ? "none" : "block"
            }}
          >
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="approverName" />}
              hasFeedback
            >
              {getFieldDecorator("approvalName", {
                initialValue: applyInvoice.approvalName
              })(<Input disabled placeholder=" " type="text" />)}
            </FormItem>
          </Col>
          <Col
            sm={{ span: 16, offset: 4 }}
            md={{ span: 16, offset: 2 }}
            lg={{ span: 12, offset: 0 }}
            xl={{ span: 6, offset: 0 }}
            style={{
              display: applyInvoice.approvalTime == undefined ? "none" : "block"
            }}
          >
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="approvalTime" />}
              hasFeedback
            >
              {getFieldDecorator("approvalTime", {
                initialValue: applyInvoice.approvalTime
              })(<Input disabled placeholder=" " type="text" />)}
            </FormItem>
          </Col>
          <Col
            sm={{ span: 16, offset: 2 }}
            md={{ span: 16, offset: 2 }}
            lg={{ span: 24, offset: 0 }}
            xl={{ span: 12, offset: 0 }}
          >
            <FormItem
              {...formItemLayout2}
              label={<FormattedMessage id="description" />}
              hasFeedback
            >
              {getFieldDecorator("description", {
                initialValue: applyInvoice.description
              })(<TextArea rows={4} />)}
            </FormItem>
          </Col>
        </Form>
      </div>
    );
  }
}
const applyFrom = Form.create()(XApplyFrom);
export default applyFrom;
