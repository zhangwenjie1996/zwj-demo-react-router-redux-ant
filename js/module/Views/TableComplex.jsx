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
  Select,
  Table,
  Popconfirm,
  Tooltip,
  TreeSelect,
  DatePicker
} from "antd";
import { XTitle, XSubmitButton, XIntlProvider } from "../../component";
import XInfo from "../../util/infomation";
import { FormattedMessage } from "react-intl";
import NorthCenter from "../../layout/latest-northcenter";
import Request from "../../util/ajax";
import XSalaryTable from "../../util/tableb";
// import XSalaryForm from "./salaryForm";
import $ from "jquery";
import moment from "moment";
const TreeNode = TreeSelect.TreeNode;
const FormItem = Form.Item;
const { MonthPicker } = DatePicker;

class XForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const postloop = data =>
      data.map(item => {
        if (item.children && item.children.length > 0) {
          return (
            <TreeNode
              key={String(item.postID)}
              title={item.postName}
              value={String(item.postID)}
            >
              {postloop(item.children)}
            </TreeNode>
          );
        }
        return (
          <TreeNode
            key={String(item.postID)}
            title={item.postName}
            value={String(item.postID)}
            isLeaf
          />
        );
      });
    const organizationloop = data =>
      data.map(item => {
        if (item.children && item.children.length > 0) {
          return (
            <TreeNode
              key={String(item.key)}
              title={item.title}
              value={String(item.key)}
            >
              {organizationloop(item.children)}
            </TreeNode>
          );
        }
        return (
          <TreeNode
            key={String(item.key)}
            title={item.title}
            value={String(item.key)}
            isLeaf
          />
        );
      });
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    const { postData, organizationData } = this.props;
    return (
      <Form className="form manageForm">
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
                label={<FormattedMessage id="postName" />}
                hasFeedback
              >
                {getFieldDecorator("postID")(
                  <TreeSelect
                    dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                    placeholder=""
                    allowClear
                    treeCheckStrictly
                    onChange={this.onSelectPostChange}
                  >
                    {postloop(postData)}
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
                label={<FormattedMessage id="organName" />}
                hasFeedback
              >
                {getFieldDecorator("organID")(
                  <TreeSelect
                    dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                    placeholder=""
                    allowClear
                    treeCheckStrictly
                    onChange={this.onSelectOrganizationChange}
                  >
                    {organizationloop(organizationData)}
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
                label={<FormattedMessage id="balanceDate" />}
                hasFeedback
              >
                {getFieldDecorator("balanceDate")(<MonthPicker />)}
              </FormItem>
            </Col>
          </Col>
          <Col className="formRightBtn">
            <FormItem style={{ marginBottom: 8 }}>
              <Button type="primary" onClick={this.props.handleSubmit}>
                <Icon type="search" className="iconStyle" />{" "}
                <FormattedMessage id="query" />
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}
const XSalaryFilter = Form.create()(XForm);

export default class XSalaryManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data: [],
      postdata: [],
      columns: []
    };
    this.requestIp = "hr";
    this.url = "wageReport";
    this.url2 = "overTimeInvoice/overtimeEmployees/";
    this.saveUrl = "wageReport";
    this.postTreeUrl = "post/findAllSelectPost";
    this.organizationTreeUrl = "organ/tree";
    this.pageSize = 10;
    this.postData = [];
    this.organizationData = [];
    this.current = 1;
    this.title = (
      <span>
        <Icon type="lock" style={{ marginRight: 6 }} />
        <FormattedMessage id="other" />
      </span>
    );
    this.echoForm = {};
    this.resultData = [];
    this.newResultData = [];
  }

  componentDidMount() {
    let obj = {};
    obj.current = this.current;
    obj.rowCount = this.pageSize;
    this.loadTable(obj);
    this.getPostData();
    this.getOrganizationData();
  }

  //加载表格数据
  loadTable = obj => {
    let option = {};
    option.url = this.url;
    option.data = obj;
    option.success = result => {
      if (result.state == "Success") {
        this.resultData = JSON.parse(JSON.stringify(result.data.rows)); //存放最初始数据
        this.newResultData = result.data.rows; //newResultData  改造初始从后台响应的数据格式，动态生成colums项
        let columns = [];
        // 后台响应有数据 给colums动态绑定项
        if (this.newResultData.length > 0) {
          columns = [
            {
              title: <FormattedMessage id="employeeName" />,
              className: "center",
              width: 100,
              dataIndex: "employeeName",
              key: "employeeName",
              fixed: "left"
            },
            {
              title: <FormattedMessage id="postName" />,
              className: "center",
              width: 100,
              dataIndex: "postName",
              key: "postName",
              fixed: "left"
            },
            {
              title: <FormattedMessage id="organName" />,
              className: "center",
              width: 100,
              dataIndex: "organName",
              key: "organName",
              fixed: "left"
            },
            {
              title: <FormattedMessage id="balanceDate" />,
              className: "center",
              width: 100,
              dataIndex: "balanceDate",
              key: "balanceDate",
              fixed: "left"
            },
            {
              title: <FormattedMessage id="realWages" />,
              className: "center",
              width: 100,
              dataIndex: "realWages",
              key: "realWages",
              fixed: "left"
            }
          ];
          //  设置table的scrollX值 建议指定 scroll.x 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 scroll.x。
          columns.scrollX = columns.length * 100;
          this.newResultData.map((item, index) => {
            item.key = item.wageReportID;
            item.wageReportItemViewModels.map((item2, index2) => {
              item[item2.wageItemKey] = item2.wageValue;
            });
          });

          this.newResultData[0].wageReportItemViewModels.map((item, index) => {
            columns.push(
              JSON.parse(
                JSON.stringify({
                  title: item.wageItemName,
                  dataIndex: item.wageItemKey,
                  key: index,
                  className: "right",
                  width: 100
                })
              )
            );
            columns.scrollX += 100;
          });
          columns.push({
            title: <FormattedMessage id="operation" />,
            key: "operation",
            fixed: "right",
            className: "center",
            width: 40,
            render: (text, record, index) => {
              return (
                <a onClick={() => this.edit(record)}>
                  <Tooltip
                    placement="topRight"
                    title={<FormattedMessage id="edit" />}
                  >
                    <Icon type="edit" />
                  </Tooltip>
                </a>
              );
            }
          });
          columns.scrollX += 40;
        }

        this.setState({
          columns: columns,
          data: result.data
        });
      } else {
        this.xinfo.msgError(result.message);
      }
    };
    Request.connect(this.requestIp, option);
  };

  // 编辑操作
  edit = record => {
    this.echoForm = record;
    this.wageReportID = record.wageReportID;
    this.setState(
      {
        visible: true
      },
      () => {
        // 每次打开模态框 重置保存按钮为可选状态
        this.refs.submitButton.reset();
      }
    );
  };

  // 编辑保存 返回ture时按钮可用  否则返回undefined/false为不可用状态
  handleOk = () => {
    let flag = false;
    const form = this.refs.XSalaryForm;
    form.validateFields((err, values) => {
      if (err) {
        // 有错误条件重置按钮为可用状态
        flag = true;
        return;
      }
      const { OtherAllowance, OtherDeductions } = values;
      let data, newData; // data当前编辑行的新数据 newData 发送给后台的数据
      for (var i = 0; i < this.resultData.length; i++) {
        if (this.resultData[i].wageReportID == this.wageReportID) {
          this.resultData[i].wageReportItemViewModels.map((item, index) => {
            if (item.wageItemKey == "OtherAllowance") {
              item.wageValue = OtherAllowance;
            }
            if (item.wageItemKey == "OtherDeductions") {
              item.wageValue = "-" + OtherDeductions;
            }
          });
          data = this.resultData[i];
          break;
        }
      }
      newData = JSON.parse(JSON.stringify(data)); // 须设置JSON.parse(JSON.stringify())实现对象的深拷贝，新辟一个新的存储地址，这样就切断了引用对象的指针联系，不影响当前data数据
      newData.wageReportItemCommands = newData.wageReportItemViewModels;
      delete newData.wageReportItemViewModels;
      let option = {};
      option.url = this.saveUrl + "/" + this.wageReportID;
      option.contentType = "application/json;charset=utf-8";
      option.data = JSON.stringify(newData);
      option.type = "PUT";
      // option.async = false; //需设成同步请求 否则直接返回的flag是undefined
      option.success = function(data) {
        if ("Success" == data.state) {
          // flag = false;
          this.xinfo.msgSuccess("saveSuccess");
          form.resetFields();
          const target = this.state.data.rows.find(
            item => item.key === this.wageReportID
          );
          if (target) {
            // 当修改了某一条数据的其他补助或其他扣款的数据，实际薪资也同时更新为新值
            target["realWages"] =
              parseFloat(target["realWages"]) -
              parseFloat(target["OtherAllowance"]) -
              parseFloat(target["OtherDeductions"]) +
              parseFloat(OtherAllowance) -
              parseFloat(OtherDeductions);
            target["OtherAllowance"] = OtherAllowance;
            target["OtherDeductions"] = "-" + OtherDeductions;
            this.setState({ data: this.state.data });
          }
          this.setState({ visible: false });
        } else {
          this.xinfo.amsgError(data.message);
        }
      }.bind(this);
      Request.connect(this.requestIp, option);
    });
    return flag;
  };

  //加载岗位下拉树数据
  getPostData = () => {
    let option = {};
    option.url = this.postTreeUrl;
    option.success = result => {
      this.postData = result.data;
    };
    Request.connect(this.requestIp, option);
  };
  //加载部门组织下拉树数据
  getOrganizationData = () => {
    let option = {};
    option.url = this.organizationTreeUrl;
    option.success = result => {
      this.organizationData = result.data;
    };
    Request.connect(this.requestIp, option);
  };

  // 条件查询
  handleSubmit = () => {
    this.current = 1;
    const form = this.refs.perFilter;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      values.balanceDate = values.balanceDate
        ? moment(values.balanceDate).format("YYYY-MM")
        : "";
      let obj = {
        current: this.current,
        rowCount: this.pageSize
      };
      obj = Object.assign(obj, values);
      this.loadTable(obj);
    });
  };

  // 分页加载
  reloadData = (current, pageSize) => {
    const form = this.refs.perFilter;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.current = current;
      this.pageSize = pageSize != undefined ? pageSize : 10;
      let obj = {
        current: this.current,
        rowCount: this.pageSize
      };
      if (String(values.length) == "{}") {
        this.loadTable(obj);
      } else {
        values.balanceDate = values.balanceDate
          ? moment(values.balanceDate).format("YYYY-MM")
          : "";
        obj = Object.assign(obj, values);
        this.loadTable(obj);
      }
    });
  };

  render() {
    const { data, columns } = this.state;

    return (
      <NorthCenter>
        <div>
          <XSalaryFilter
            ref="perFilter"
            pageSize={this.pageSize}
            url={this.url}
            handleSubmit={this.handleSubmit}
            postData={this.postData}
            organizationData={this.organizationData}
          />
        </div>
        <div id="canDisabledTable">
          {/* // 对于列数很多的数据，可以固定前后的列，横向滚动查看其它数据，需要和 scroll.x 配合使用。
        // 若列头与内容不对齐或出现列重复，请指定列的宽度 width。
        // 建议指定 scroll.x 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 scroll.x。 */}
          <XSalaryTable
            rowSelection="null"
            ref="table"
            scroll={{ x: columns.scrollX }}
            data={data}
            columns={columns}
            reloadData={this.reloadData}
            current={this.current}
          />
          <Modal
            maskClosable={false}
            width={750}
            title={this.title}
            visible={this.state.visible}
            onCancel={() => this.setState({ visible: false })}
            footer={[
              <Button
                key="cancel"
                type="ghost"
                onClick={() => this.setState({ visible: false })}
              >
                <Icon type="close" /> <FormattedMessage id="cancel" />
              </Button>,
              <XSubmitButton onClick={this.handleOk} ref="submitButton" />
            ]}
          >
            {/* <XSalaryForm ref="XSalaryForm" echoForm={this.echoForm} /> */}
          </Modal>
        </div>
      </NorthCenter>
    );
  }
}
