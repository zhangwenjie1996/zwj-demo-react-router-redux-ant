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
  Checkbox, Radio,  InputNumber, Switch,
  Slider, Upload, Rate
} from "antd";
import { FormattedMessage } from "react-intl";
import MakeCancelablePromise from "../../../util/cancelfetch";

const FormItem = Form.Item;
const TreeNode = TreeSelect.TreeNode;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
class XForm extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    treeSelectData: [],
    postData: []
  };
  componentDidMount() {
    this.loadOrgan();
    this.loadPost();
  }

  componentWillUnmount() {
    this.cancelableOrgan ? this.cancelableOrgan.cancel() : null;
    this.cancelablePost ? this.cancelablePost.cancel() : null;
  }

  //加载组织
  loadOrgan = () => {
    let url = MakeCancelablePromise.nodeserver + "organ";
    this.cancelableOrgan = MakeCancelablePromise.makeCancelable(fetch(url));
    this.cancelableOrgan.promise
      .then(response => response.json())
      .then(json => {
        this.setState({
          treeSelectData: json.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  //加载岗位
  loadPost = () => {
    let url = MakeCancelablePromise.nodeserver + "post";
    this.cancelablePost = MakeCancelablePromise.makeCancelable(fetch(url));
    this.cancelablePost.promise
      .then(response => response.json())
      .then(json => {
        this.setState({
          postData: json.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const selecttreeloop = data =>
      data.map(item => {
        if (item.children.length > 0) {
          return (
            <TreeNode
              key={item.key + ""}
              title={item.title}
              value={item.key + ""}
            >
              {selecttreeloop(item.children)}
            </TreeNode>
          );
        }
        return (
          <TreeNode
            key={item.key + ""}
            title={item.title}
            value={item.key + ""}
            isLeaf
          />
        );
      });

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    const { treeSelectData, postData } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className="form manageForm">
        <Row>
          <Col className="formLeftInput">
            <Col
              sm={{ span: 16, offset: 4 }}
              md={{ span: 12, offset: 0 }}
              lg={{ span: 8, offset: 0 }}
              xl={{ span: 6, offset: 0 }}
            >
              <FormItem
                style={{ marginBottom: 8 }}
                {...formItemLayout}
                label={<FormattedMessage id="organName" />}
                hasFeedback
              >
                {getFieldDecorator("organID")(
                  <TreeSelect
                    dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                    placeholder=""
                    allowClear
                    treeCheckStrictly
                    onChange={this.onSelectChange}
                  >
                    {selecttreeloop(treeSelectData)}
                  </TreeSelect>
                )}
              </FormItem>
            </Col>
            <Col
              sm={{ span: 16, offset: 4 }}
              md={{ span: 12, offset: 0 }}
              lg={{ span: 8, offset: 0 }}
              xl={{ span: 6, offset: 0 }}
            >
              <FormItem
                style={{ marginBottom: 8 }}
                {...formItemLayout}
                label={<FormattedMessage id="postName" />}
                hasFeedback
              >
                {getFieldDecorator("postID")(
                  <TreeSelect
                    dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                    placeholder=""
                    allowClear
                    treeCheckStrictly
                    onChange={this.onSelectChange}
                  >
                    {selecttreeloop(postData)}
                  </TreeSelect>
                )}
              </FormItem>
            </Col>
            <Col
              sm={{ span: 16, offset: 4 }}
              md={{ span: 12, offset: 0 }}
              lg={{ span: 8, offset: 0 }}
              xl={{ span: 6, offset: 0 }}
            >
              <FormItem
                {...formItemLayout}
                style={{ marginBottom: 8 }}
                label={<FormattedMessage id="employeeName" />}
                hasFeedback
              >
                {getFieldDecorator("employeeName")(
                  <Input type="text" placeholder=" " />
                )}
              </FormItem>
            </Col>
            <Col
              sm={{ span: 16, offset: 4 }}
              md={{ span: 12, offset: 0 }}
              lg={{ span: 8, offset: 0 }}
              xl={{ span: 6, offset: 0 }}
            >
              <FormItem
                {...formItemLayout}
                style={{ marginBottom: 8 }}
                label={<FormattedMessage id="employeeStatus" />}
                hasFeedback
              >
                {getFieldDecorator("employeeStatus", { initialValue: "1" })(
                  <Select placeholder=" " onChange={this.onChange}>
                    <Select.Option value="">请选择</Select.Option>
                    <Select.Option value="0">离职</Select.Option>
                    <Select.Option value="1">在职</Select.Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col
              sm={{ span: 16, offset: 4 }}
              md={{ span: 12, offset: 0 }}
              lg={{ span: 8, offset: 0 }}
              xl={{ span: 6, offset: 0 }}
              style={{ display: "none" }}
            >
              <FormItem
                {...formItemLayout}
                style={{ marginBottom: 8 }}
                label={<FormattedMessage id="availability" />}
                hasFeedback
              >
                {getFieldDecorator("availability", { initialValue: "1" })(
                  <Select placeholder=" " onChange={this.onChange}>
                    <Select.Option value="">请选择</Select.Option>
                    <Select.Option value="0">无效</Select.Option>
                    <Select.Option value="1">有效</Select.Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Col>
          <Col className="formRightBtn">
            <FormItem style={{ marginBottom: 8 }}>
              <Button type="primary" htmlType="submit">
                <Icon type="search" className="iconStyle" /> 
                <FormattedMessage id="query" />
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}
const  FilterForm = Form.create()(XForm);

class FormL extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    return (
      <Form className="form1 form2">
        <Row>
          <Col
            sm={{ span: 16, offset: 4 }}
            md={{ span: 12, offset: 0 }}
            lg={{ span: 8, offset: 0 }}
            xl={{ span: 6, offset: 0 }}
          >
            <FormItem
              style={{ marginBottom: 8 }}
              {...formItemLayout}
              label={<FormattedMessage id="applyInvoiceNo" />}
              hasFeedback
              for="storageInInvoiceID"
            >
              <Input placeholder="" id="applyInvoiceNo" />
            </FormItem>
          </Col>
          <Col
            sm={{ span: 16, offset: 4 }}
            md={{ span: 12, offset: 0 }}
            lg={{ span: 8, offset: 0 }}
            xl={{ span: 6, offset: 0 }}
          >
            <FormItem
              style={{ marginBottom: 8 }}
              {...formItemLayout}
              label={<FormattedMessage id="applyInvoiceName" />}
              hasFeedback
              for="storageInInvoiceID"
            >
              <Input placeholder="" id="applyInvoiceName" />
            </FormItem>
          </Col>
          <Col
            sm={{ span: 16, offset: 4 }}
            md={{ span: 12, offset: 0 }}
            lg={{ span: 8, offset: 0 }}
            xl={{ span: 6, offset: 0 }}
          >
            <FormItem
              style={{ marginBottom: 8 }}
              {...formItemLayout}
              label={<FormattedMessage id="invoiceState" />}
              hasFeedback
              for="applyInvoiceState"
            >
              <Input placeholder="" id="applyInvoiceName" />
            </FormItem>
          </Col>
          <Col
            sm={{ span: 16, offset: 4 }}
            md={{ span: 12, offset: 0 }}
            lg={{ span: 8, offset: 0 }}
            xl={{ span: 6, offset: 0 }}
          >
            <FormItem
              style={{ marginBottom: 8 }}
              {...formItemLayout}
              label={<FormattedMessage id="applyOrginName" />}
              hasFeedback
              for="storageInInvoiceID"
            >
              <Input placeholder="" id="applyOrginName" />
            </FormItem>
          </Col>
          <Col
            sm={{ span: 16, offset: 4 }}
            md={{ span: 12, offset: 0 }}
            lg={{ span: 8, offset: 0 }}
            xl={{ span: 6, offset: 0 }}
          >
            <FormItem
              style={{ marginBottom: 8 }}
              {...formItemLayout}
              label={<FormattedMessage id="startTime" />}
              hasFeedback
            >
              <Input placeholder="" id="applyInvoiceName" />
            </FormItem>
          </Col>
          <Col
            sm={{ span: 16, offset: 4 }}
            md={{ span: 12, offset: 0 }}
            lg={{ span: 8, offset: 0 }}
            xl={{ span: 6, offset: 0 }}
          >
            <FormItem
              style={{ marginBottom: 8 }}
              {...formItemLayout}
              label={<FormattedMessage id="abortTime" />}
              hasFeedback
            >
              <Input placeholder="" id="applyInvoiceName" />
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

const LayoutForm = Form.create()(FormL);

class FormL2 extends React.Component {
  // render() {
  //   const { getFieldDecorator } = this.props.form;

  //   return (
  //     <Form style={{maxWidth:800,margin:"auto"}} >
  //       <Row>
  //         <Col sm={{ span: 16, offset: 4 }}>
  //           <FormItem
  //             {...formItemLayout}
  //             label={<FormattedMessage id="applyInvoiceNo" />}
  //             hasFeedback
  //             for="storageInInvoiceID"
  //           >
  //             <Input placeholder="" id="applyInvoiceNo" />
  //           </FormItem>
  //         </Col>
  //         <Col sm={{ span: 16, offset: 4 }}>
  //           <FormItem
  //             {...formItemLayout}
  //             label={<FormattedMessage id="applyInvoiceName" />}
  //             hasFeedback
  //             for="storageInInvoiceID"
  //           >
  //             <Input placeholder="" id="applyInvoiceName" />
  //           </FormItem>
  //         </Col>
  //         <Col sm={{ span: 16, offset: 4 }}>
  //           <FormItem
  //             {...formItemLayout}
  //             label={<FormattedMessage id="invoiceState" />}
  //             hasFeedback
  //             for="applyInvoiceState"
  //           >
  //             <Input placeholder="" id="applyInvoiceName" />
  //           </FormItem>
  //         </Col>
  //         <Col sm={{ span: 16, offset: 4 }}>
  //           <FormItem
  //             {...formItemLayout}
  //             label={<FormattedMessage id="applyOrginName" />}
  //             hasFeedback
  //             for="storageInInvoiceID"
  //           >
  //             <Input placeholder="" id="applyOrginName" />
  //           </FormItem>
  //         </Col>
  //         <Col sm={{ span: 16, offset: 4 }}>
  //           <FormItem
  //             {...formItemLayout}
  //             label={<FormattedMessage id="startTime" />}
  //             hasFeedback
  //           >
  //            <DatePicker
  //     showTime
  //     format="YYYY-MM-DD HH:mm:ss"
  //     placeholder="Select Time"
  //   />
  //           </FormItem>
  //         </Col>
  //         <Col sm={{ span: 16, offset: 4 }}>
  //           <FormItem
  //             {...formItemLayout}
  //             label={<FormattedMessage id="abortTime" />}
  //             hasFeedback
  //           >
  //                  <DatePicker
  //     showTime
  //     format="YYYY-MM-DD HH:mm:ss"
  //     placeholder="Select Time"
  //   />
  //           </FormItem>
  //         </Col>
  //       </Row>
  //     </Form>
  //   );
  // }
  
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
      <Form onSubmit={this.handleSubmit}  style={{maxWidth:800,margin:"auto"}} >
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
          label="Date.picker"
        >
          {getFieldDecorator('date-picker')(
             <DatePicker
      showTime
      format="YYYY-MM-DD HH:mm:ss"
      placeholder="Select Time"
    />
          )}
        </FormItem>
      </Form>
    );
  }
}

const LayoutForm2 = Form.create()(FormL2);
class FormL3 extends React.Component {
  render() {
    return (
      <Form className="form5 " style={{maxWidth:800,margin:"auto"}} >
        <Row>
          <Col
            xs={{ span: 16, offset: 4 }}
            sm={{ span: 16, offset: 4 }}
            md={{ span: 12, offset: 0 }}
            lg={{ span: 12, offset: 0 }}
          >
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="applyInvoiceNo" />}
              hasFeedback
              for="storageInInvoiceID"
            >
              <Input placeholder="" id="applyInvoiceNo" />
            </FormItem>
          </Col>
          <Col
            xs={{ span: 16, offset: 4 }}
            sm={{ span: 16, offset: 4 }}
            md={{ span: 12, offset: 0 }}
            lg={{ span: 12, offset: 0 }}
          >
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="applyInvoiceNo" />}
              hasFeedback
              for="storageInInvoiceID"
            >
              <Input placeholder="" id="applyInvoiceNo" />
            </FormItem>
          </Col>
          <Col
            xs={{ span: 16, offset: 4 }}
            sm={{ span: 16, offset: 4 }}
            md={{ span: 12, offset: 0 }}
            lg={{ span: 12, offset: 0 }}
          >
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="applyInvoiceNo" />}
              hasFeedback
              for="storageInInvoiceID"
            >
              <Input placeholder="" id="applyInvoiceNo" />
            </FormItem>
          </Col>
          <Col
            xs={{ span: 16, offset: 4 }}
            sm={{ span: 16, offset: 4 }}
            md={{ span: 12, offset: 0 }}
            lg={{ span: 12, offset: 0 }}
          >
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="applyInvoiceNo" />}
              hasFeedback
              for="storageInInvoiceID"
            >
              <Input placeholder="" id="applyInvoiceNo" />
            </FormItem>
          </Col>
          <Col
            xs={{ span: 16, offset: 4 }}
            sm={{ span: 16, offset: 4 }}
            md={{ span: 12, offset: 0 }}
            lg={{ span: 12, offset: 0 }}
          >
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="applyInvoiceNo" />}
              hasFeedback
              for="storageInInvoiceID"
            >
              <Input placeholder="" id="applyInvoiceNo" />
            </FormItem>
          </Col>
          <Col
            xs={{ span: 16, offset: 4 }}
            sm={{ span: 16, offset: 4 }}
            md={{ span: 12, offset: 0 }}
            lg={{ span: 12, offset: 0 }}
          >
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="applyInvoiceNo" />}
              hasFeedback
              for="storageInInvoiceID"
            >
              <Input placeholder="" id="applyInvoiceNo" />
            </FormItem>
          </Col>
          <Col
            xs={{ span: 16, offset: 4 }}
            sm={{ span: 16, offset: 4 }}
            md={{ span: 12, offset: 0 }}
            lg={{ span: 12, offset: 0 }}
          >
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="applyInvoiceNo" />}
              hasFeedback
              for="storageInInvoiceID"
            >
              <Input placeholder="" id="applyInvoiceNo" />
            </FormItem>
          </Col>
          <Col
            xs={{ span: 16, offset: 4 }}
            sm={{ span: 16, offset: 4 }}
            md={{ span: 12, offset: 0 }}
            lg={{ span: 12, offset: 0 }}
          >
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="applyInvoiceNo" />}
              hasFeedback
              for="storageInInvoiceID"
            >
              <Input placeholder="" id="applyInvoiceNo" />
            </FormItem>
          </Col>
          <Col
            xs={{ span: 16, offset: 4 }}
            sm={{ span: 16, offset: 4 }}
            md={{ span: 12, offset: 0 }}
            lg={{ span: 12, offset: 0 }}
          >
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="applyInvoiceNo" />}
              hasFeedback
              for="storageInInvoiceID"
            >
              <Input placeholder="" id="applyInvoiceNo" />
            </FormItem>
          </Col>
          <Col
            xs={{ span: 16, offset: 4 }}
            sm={{ span: 16, offset: 4 }}
            md={{ span: 12, offset: 0 }}
            lg={{ span: 12, offset: 0 }}
          >
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="applyInvoiceNo" />}
              hasFeedback
              for="storageInInvoiceID"
            >
              <Input placeholder="" id="applyInvoiceNo" />
            </FormItem>
          </Col>
          <Col
            xs={{ span: 16, offset: 4 }}
            sm={{ span: 16, offset: 4 }}
            md={{ span: 12, offset: 0 }}
            lg={{ span: 12, offset: 0 }}
          >
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="applyInvoiceNo" />}
              hasFeedback
              for="storageInInvoiceID"
            >
              <Input placeholder="" id="applyInvoiceNo" />
            </FormItem>
          </Col>
          <Col
            xs={{ span: 16, offset: 4 }}
            sm={{ span: 16, offset: 4 }}
            md={{ span: 12, offset: 0 }}
            lg={{ span: 12, offset: 0 }}
          >
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="applyInvoiceNo" />}
              hasFeedback
              for="storageInInvoiceID"
            >
              <Input placeholder="" id="applyInvoiceNo" />
            </FormItem>
          </Col>
          <Col
            xs={{ span: 16, offset: 4 }}
            sm={{ span: 16, offset: 4 }}
            md={{ span: 12, offset: 0 }}
            lg={{ span: 12, offset: 0 }}
          >
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="applyInvoiceNo" />}
              hasFeedback
              for="storageInInvoiceID"
            >
              <Input placeholder="" id="applyInvoiceNo" />
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

const LayoutForm3 = Form.create()(FormL3);

export default class FormLManage extends Component {
  render() {
    return (
      <div id="Form">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} className="col-margin">
            <div className="form-block">
              <div className="form-demo-title">表单查询</div>
              <FilterForm />
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} className="col-margin">
            <div className="form-block">
              <div className="form-demo-title">表单布局</div>
              <LayoutForm />
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} className="col-margin"> 
            <div className="form-block">
              <div className="form-demo-title">单列布局</div>
              <LayoutForm2 />
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} className="col-margin"> 
            <div className="form-block">
              <div className="form-demo-title">双列布局</div>
              <LayoutForm3 />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
