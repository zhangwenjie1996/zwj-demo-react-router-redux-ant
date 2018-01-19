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
  Select
} from "antd";
import { FormattedMessage } from "react-intl";
import Request from "../../util/ajax";
import MakeCancelablePromise from "../../util/cancelfetch";

const FormItem = Form.Item;
const TreeNode = TreeSelect.TreeNode;
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
            xl={{ span: 8, offset: 0 }}
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
            xl={{ span: 8, offset: 0 }}
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
            xl={{ span: 8, offset: 0 }}
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
            xl={{ span: 8, offset: 0 }}
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
            xl={{ span: 8, offset: 0 }}
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
            xl={{ span: 8, offset: 0 }}
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
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form  >
        <Row>
          <Col sm={{ span: 16, offset: 4 }}>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="applyInvoiceNo" />}
              hasFeedback
              for="storageInInvoiceID"
            >
              <Input placeholder="" id="applyInvoiceNo" />
            </FormItem>
          </Col>
          <Col sm={{ span: 16, offset: 4 }}>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="applyInvoiceName" />}
              hasFeedback
              for="storageInInvoiceID"
            >
              <Input placeholder="" id="applyInvoiceName" />
            </FormItem>
          </Col>
          <Col sm={{ span: 16, offset: 4 }}>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="invoiceState" />}
              hasFeedback
              for="applyInvoiceState"
            >
              <Input placeholder="" id="applyInvoiceName" />
            </FormItem>
          </Col>
          <Col sm={{ span: 16, offset: 4 }}>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="applyOrginName" />}
              hasFeedback
              for="storageInInvoiceID"
            >
              <Input placeholder="" id="applyOrginName" />
            </FormItem>
          </Col>
          <Col sm={{ span: 16, offset: 4 }}>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="startTime" />}
              hasFeedback
            >
              <Input placeholder="" id="applyInvoiceName" />
            </FormItem>
          </Col>
          <Col sm={{ span: 16, offset: 4 }}>
            <FormItem
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

const LayoutForm2 = Form.create()(FormL2);
class FormL3 extends React.Component {
  render() {
    return (
      <Form className="form5 ">
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
