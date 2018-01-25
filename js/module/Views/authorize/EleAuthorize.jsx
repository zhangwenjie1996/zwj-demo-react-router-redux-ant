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
import {  XOperateButton, XIntlProvider } from "../../../component";
import NorthCenter from "../../../layout/latest-northcenter";
import Request from "../../../util/ajax";
import $ from "jquery";
import moment from "moment";
 

 
export default class AuthorizePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NorthCenter>
        <div>
        <XOperateButton callbackParentAdd={this.onChildChangedAddElement}
                callbackParentEdit={this.onChildChangedEditElement}
                callbackParentDel={this.onChildChangedDelElement}
                callbackParentSel={this.onChildChangedViewElement} page="AuthorizePage"
                 />
        </div>
        <div></div>
      </NorthCenter>
    );
  }
}
