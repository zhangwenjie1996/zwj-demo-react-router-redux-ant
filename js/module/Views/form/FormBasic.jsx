import React, { PropTypes, Component } from 'react';
import {
  Form, Icon, Input, Button, Checkbox, Row, Col, Radio, Select, InputNumber, Switch,
  Slider, Upload, Rate
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import Draggable, { DraggableCore } from 'react-draggable';

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
            )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

class FormLayoutDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'horizontal',
    };
  }
  handleFormLayoutChange = (e) => {
    this.setState({ formLayout: e.target.value });
  }
  render() {
    const { formLayout } = this.state;
    const formItemLayout = formLayout === 'horizontal' ? {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    } : null;
    const buttonItemLayout = formLayout === 'horizontal' ? {
      wrapperCol: { span: 14, offset: 4 },
    } : null;
    return (
      <div>
        <Form layout={formLayout}>
          <FormItem
            label="Form Layout"
            {...formItemLayout}
          >
            <Radio.Group defaultValue="horizontal" onChange={this.handleFormLayoutChange}>
              <Radio.Button value="horizontal">Horizontal</Radio.Button>
              <Radio.Button value="vertical">Vertical</Radio.Button>
              <Radio.Button value="inline">Inline</Radio.Button>
            </Radio.Group>
          </FormItem>
          <FormItem
            label="Field A"
            {...formItemLayout}
          >
            <Input placeholder="input placeholder" />
          </FormItem>
          <FormItem
            label="Field B"
            {...formItemLayout}
          >
            <Input placeholder="input placeholder" />
          </FormItem>
          <FormItem {...buttonItemLayout}>
            <Button type="primary">Submit</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

class Demo extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Plain Text"
        >
          <span className="ant-form-text">China</span>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Select"
          hasFeedback
        >
          {getFieldDecorator('select', {
            rules: [
              { required: true, message: 'Please select your country!' },
            ],
          })(
            <Select placeholder="Please select a country">
              <Option value="china">China</Option>
              <Option value="use">U.S.A</Option>
            </Select>
            )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Select[multiple]"
        >
          {getFieldDecorator('select-multiple', {
            rules: [
              { required: true, message: 'Please select your favourite colors!', type: 'array' },
            ],
          })(
            <Select mode="multiple" placeholder="Please select favourite colors">
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
            )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="InputNumber"
        >
          {getFieldDecorator('input-number', { initialValue: 3 })(
            <InputNumber min={1} max={10} />
          )}
          <span className="ant-form-text"> machines</span>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Switch"
        >
          {getFieldDecorator('switch', { valuePropName: 'checked' })(
            <Switch />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Slider"
        >
          {getFieldDecorator('slider')(
            <Slider marks={{ 0: 'A', 20: 'B', 40: 'C', 60: 'D', 80: 'E', 100: 'F' }} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Radio.Group"
        >
          {getFieldDecorator('radio-group')(
            <RadioGroup>
              <Radio value="a">item 1</Radio>
              <Radio value="b">item 2</Radio>
              <Radio value="c">item 3</Radio>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Radio.Button"
        >
          {getFieldDecorator('radio-button')(
            <RadioGroup>
              <RadioButton value="a">item 1</RadioButton>
              <RadioButton value="b">item 2</RadioButton>
              <RadioButton value="c">item 3</RadioButton>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Rate"
        >
          {getFieldDecorator('rate', {
            initialValue: 3.5,
          })(
            <Rate />
            )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Upload"
          extra="longgggggggggggggggggggggggggggggggggg"
        >
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
            )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Dragger"
        >
          <div className="dropbox">
            {getFieldDecorator('dragger', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
              </Upload.Dragger>
              )}
          </div>
        </FormItem>

        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedDemo = Form.create()(Demo);

export default class FormBasic extends Component {

  render() {
    return (
      <div id="Form">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} className="col-margin"> 
            <Draggable  >
              <div className="form-block">
                <div className="form-demo-title">简单登录表单</div>
                <WrappedNormalLoginForm />
              </div>
            </Draggable>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} className="col-margin">
            <Draggable  >
              <div className="form-block">
                <div className="form-demo-title">表单布局</div>
                <FormLayoutDemo />
              </div>
            </Draggable>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} className="col-margin"> 
            <Draggable  >
              <div className="form-block">
                <div className="form-demo-title">校验表单</div>
                <WrappedDemo />
              </div>
            </Draggable>
          </Col>
        </Row>
      </div>
    )
  }
}