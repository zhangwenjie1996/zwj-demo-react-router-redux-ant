import React, { Component } from "react";
import ReactDOM from "react-dom";
import { XTitle, XOperateButton } from "../../../../component";
import {
  Row,
  Col,
  Modal,
  Button,
  Form,
  Icon,
  Input,
  Select,
  message,
  Tooltip,
  Divider
} from "antd";
import { FormattedMessage } from "react-intl";
import * as FontAwesome from "react-icons/lib/fa";
import NorthCenter from "../../../../layout/latest-northcenter";
// import '../../../../../css/common.less';
import XTable from "../../../../util/tableb";
import Request from "../../../../util/ajax";
import BillInfo from "./billInfo";
import moment from "moment";
import MakeCancelablePromise from "../../../../util/cancelfetch";

export default class BillForm extends NorthCenter {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: <FormattedMessage id="materialModelCode" />,
        dataIndex: "materialModelCode",
        className: "center",
        width: 120
      },
      {
        title: <FormattedMessage id="materialCategoryName" />,
        dataIndex: "materialCategoryName",
        className: "center",
        width: 120
      },
      {
        title: <FormattedMessage id="materialModelName" />,
        dataIndex: "materialModelName",
        className: "right",
        width: 120
      },
      {
        title: <FormattedMessage id="materialPrice" />,
        dataIndex: "materialPrice",
        className: "center"
      },
      {
        title: <FormattedMessage id="amount" />,
        dataIndex: "amount",
        className: "center"
      },
      {
        title: <FormattedMessage id="unit" />,
        dataIndex: "unit",
        className: "center"
      },
      {
        title: <FormattedMessage id="remark" />,
        dataIndex: "remark",
        className: "center"
      }
    ];
    this.state = {
      applyInvoice: {},
      data: {}
    };
    this.pageSize = 10;
    this.current = 1;
  }

  //加载数据
  componentDidMount = () => {
    this.table();
  };

  //加载表格数据
  table = () => {
    let url = MakeCancelablePromise.nodeserver + "billForm";
    this.cancelablePost = MakeCancelablePromise.makeCancelable(fetch(url));
    this.cancelablePost.promise
      .then(response => response.json())
      .then(json => {
        if (json.state == "Success") {
          // 假分页
          let obj = {};
          obj.current = this.current;
          obj.total = json.data.length;
          obj.rows = json.data;
          json.data.map(item => {
            item.key = item.id;
          });
          this.setState({
            data: obj
          });
        } else {
          this.xinfo.msgError(json.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  getSelectedRows = (selectedRowKeys, selectedRows) => {
    this.selectedRows = selectedRows;
  };
  reloadData = (current, pageSize) => {
    this.current = current;
    this.pageSize = pageSize != undefined ? pageSize : 5;
    this.state.data.current = current;
    this.setState({
      data: this.state.data
    });
  };

  onRowClick = (record, index) => {
    this.refs.table.onRowClick(record, index);
  };
  onAdd = () => {};
  render() {
    return (
      <div id="Form">
        <div className="form-block">
          <div className="form-demo-title">表单一</div>
          <BillInfo applyInvoice={this.state.applyInvoice} />
        </div>
        <div className="form-block">
          <div className="form-demo-title">表单二</div>
          <BillInfo applyInvoice={this.state.applyInvoice} />
        </div>
        <div className="form-block">
          <div className="form-demo-title">表单三</div>
          <BillInfo applyInvoice={this.state.applyInvoice} />
        </div>
        <XOperateButton
          callbackParentAdd={this.onAdd}
          hideSel="none"
          hideDel="none"
          hideEdit="none"
          page="enquiryForm"
        />
        <XTable
          rowClassName="animated fadeInRight"
          ref="table"
          data={this.state.data}
          columns={this.columns}
          getSelectedRows={this.getSelectedRows}
          reloadData={this.reloadData}
          current={this.current}
          onRowClick={this.onRowClick}
        />
      </div>
    );
  }
}
// ReactDOM.render(<XUserManage />, document.getElementById("usermanage"));
