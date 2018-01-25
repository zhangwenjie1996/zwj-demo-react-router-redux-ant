import React, { Component } from "react";
import ReactDOM from "react-dom";
import { XTitle, XOperateButton } from "../../../component";
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
import NorthCenter from "../../../layout/latest-northcenter";
// import '../../../../../css/common.less';
import XTable from "../../../util/tableb";
import Request from "../../../util/ajax";
import FilterCondition from "./filterCondition";
import moment from "moment";
import MakeCancelablePromise from "../../../util/cancelfetch";

export default class ModalQueryTableInfo extends NorthCenter {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: <FormattedMessage id="name" />,
        dataIndex: "name",
        className: "center",
        width: 120
      },
      {
        title: <FormattedMessage id="nickName" />,
        dataIndex: "nickName",
        className: "center",
        width: 120
      },
      {
        title: <FormattedMessage id="age" />,
        dataIndex: "age",
        className: "right",
        width: 120
      },
      {
        title: <FormattedMessage id="gender" />,
        dataIndex: "gender",
        className: "center",
        width: 120,
        render: (text, record) => {
          switch (text + "") {
            case "1":
              return "男";
            case "0":
              return "女";
          }
        }
      },
      {
        title: <FormattedMessage id="phone" />,
        dataIndex: "phone",
        className: "center"
      },
      {
        title: <FormattedMessage id="email" />,
        dataIndex: "email",
        className: "center"
      },
      {
        title: <FormattedMessage id="address" />,
        dataIndex: "address",
        className: "center"
      },
      {
        title: <FormattedMessage id="createTime" />,
        className: "center",
        dataIndex: "createTime"
      }
    ];
    this.state = {
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
    let url = MakeCancelablePromise.nodeserver + "enquiryForm";
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
      <NorthCenter>
          <div className="form-block">
            <div className="form-demo-title">筛选条件</div>
            <FilterCondition />
          </div>
        <div>
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
      </NorthCenter>
    );
  }
}
// ReactDOM.render(<XUserManage />, document.getElementById("usermanage"));
