import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  Row,
  Col,
  Modal,
  Button,
  Form,
  Icon,
  Input,
  TreeSelect,
  Select,
  DatePicker,
  Checkbox,
  Radio,
  InputNumber,
  Switch,
  Slider,
  Upload,
  Rate
} from "antd";
import { FormattedMessage } from "react-intl";
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

class SingleForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };
    return (
      <Form
        onSubmit={this.handleSubmit}
        style={{ maxWidth: 800, margin: "auto" }}
      >
        <FormItem {...formItemLayout} label="纯文本">
          <span className="ant-form-text">China</span>
        </FormItem>
        <FormItem {...formItemLayout} label="选择器" hasFeedback>
          {getFieldDecorator("select", {
            rules: [{ required: true, message: "Please select your country!" }]
          })(
            <Select placeholder="Please select a country">
              <Option value="china">China</Option>
              <Option value="use">U.S.A</Option>
            </Select>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="选择器[多选]">
          {getFieldDecorator("select-multiple", {
            rules: [
              {
                required: true,
                message: "Please select your favourite colors!",
                type: "array"
              }
            ]
          })(
            <Select
              mode="multiple"
              placeholder="Please select favourite colors"
            >
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="数字输入框">
          {getFieldDecorator("input-number", { initialValue: 3 })(
            <InputNumber min={1} max={10} />
          )}
          <span className="ant-form-text">美元</span>
        </FormItem>

        <FormItem {...formItemLayout} label="开关切换">
          {getFieldDecorator("switch", { valuePropName: "checked" })(
            <Switch />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="滑动输入条">
          {getFieldDecorator("slider")(
            <Slider
              marks={{ 0: "A", 20: "B", 40: "C", 60: "D", 80: "E", 100: "F" }}
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="Radio单选框">
          {getFieldDecorator("radio-group")(
            <RadioGroup>
              <Radio value="a">item 1</Radio>
              <Radio value="b">item 2</Radio>
              <Radio value="c">item 3</Radio>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="Radio按钮单选框">
          {getFieldDecorator("radio-button")(
            <RadioGroup>
              <RadioButton value="a">item 1</RadioButton>
              <RadioButton value="b">item 2</RadioButton>
              <RadioButton value="c">item 3</RadioButton>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="日期选择器">
          {getFieldDecorator("date-picker")(
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="Select Time"
            />
          )}
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
          <Icon type="save" /><FormattedMessage id='save' />
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const SingleFormWrapper = Form.create()(SingleForm);

export default class FormLManage extends Component {
  render() {
    return (
      <div id="Form">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} className="col-margin">
            <div className="form-block">
              <div className="form-demo-title">单列布局</div>
              <SingleFormWrapper />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
