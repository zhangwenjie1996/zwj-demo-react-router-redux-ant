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
  Rate,
  Cascader
} from "antd";
import { FormattedMessage } from "react-intl";
import MakeCancelablePromise from "../../../../util/cancelfetch";

const FormItem = Form.Item;
const TreeNode = TreeSelect.TreeNode;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};
const options = [
  {
    value: "北京",
    label: "北京",
    children: [
      {
        value: "北京市",
        label: "北京市",
        children: [
          {
            value: "昌平区",
            label: "昌平区"
          }
        ]
      }
    ]
  },
  {
    value: "河南",
    label: "河南",
    children: [
      {
        value: "驻马店市",
        label: "驻马店市",
        children: [
          {
            value: "西平县",
            label: "西平县"
          }
        ]
      }
    ]
  }
];

class Filter extends Component {
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
  onChange = value => {
    console.log(value);
  };
  onDateChange = (date, dateString) => {
    console.log(date, dateString);
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
                label={<FormattedMessage id="name" />}
                hasFeedback
              >
                <Input />
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
                label={<FormattedMessage id="address" />}
                hasFeedback
              >
                <Cascader
                  options={options}
                  onChange={this.onChange}
                  changeOnSelect
                />
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
                label={<FormattedMessage id="createTime" />}
                hasFeedback
              >
                {getFieldDecorator("createTime")(
                  <DatePicker onChange={this.onDateChange} />
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
const FilterCondition = Form.create()(Filter);
export default FilterCondition;
