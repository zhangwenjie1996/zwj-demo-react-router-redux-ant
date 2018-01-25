import React, { Component } from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  message,
  Row,
  Col,
  LocaleProvider
} from "antd";
import { FormattedMessage } from "react-intl";
import { XIntlProvider } from "../component";
import { IntlProvider } from "react-intl";
import Context from "../util/context";
import "./login.less";
import Request from "../util/ajax";
import XInfo from "../util/infomation";
import {
  Router,
  Route,
  IndexRoute,
  Redirect,
  IndexRedirect,
  Link,
  IndexLink,
  browserHistory
} from "react-router";
import PropTypes from "prop-types";

// console.log(111,(function(x,f=()=>x){
//   var x;
//   var y=x;
//   x=2;
//   return [x,y,f()]
// })(1)) ;
// console.log(222,(function(){
//   return [(()=>this.x).bind({x:'inner'})(),
//   (()=>this.x)()
//   ]
//   }).call({x:'outer'}))
// console.log(333,((...x,xs)=>x)(1,2,3))
const FormItem = Form.Item;

class NormalLoginForm extends XIntlProvider {
  handleSubmit = () => {
    let data = {};
    this.props.form.validateFields((err, values) => {
      if (!err) {
        $.ajax({
          type: "POST",
          url: Request.url("rbac", "login/login"),
          async: false,
          data: values,
          success: function(result) {
            if (typeof result == "string") {
              result = JSON.parse(result);
            }
            if (result.state == "Success") {
              sessionStorage.setItem("token", result.token);
              const data = result.data;
              sessionStorage.setItem("accountid", data.accountid);
              sessionStorage.setItem("accountname", data.accountname);
              sessionStorage.setItem("accountpass", data.accountpass);
              sessionStorage.setItem("roleId", data.roleId);
              let option = {};
              option.url = "employee/acountId?accountID=" + data.accountid;
              option.data = {};
              option.success = result => {
                if (result.state == "Success") {
                  this.xinfo.amsgSuccess(result.message);
                  result = result.data;
                  sessionStorage.setItem("employeeid", result.employeeID);
                  sessionStorage.setItem("organID", result.organID);
                  sessionStorage.setItem("postID", result.postID);
                  sessionStorage.setItem(
                    "employeeName",
                    encodeURI(encodeURI(result.employeeName))
                  );
                  sessionStorage.setItem(
                    "postName",
                    encodeURI(encodeURI(result.postName))
                  );
                  sessionStorage.setItem(
                    "organName",
                    encodeURI(encodeURI(result.organName))
                  );
                  console.log("browserHistory", browserHistory);
                  browserHistory.replace("/");
                  //   window.location.href = "index.html";
                }
              };
              option.error = result => {};
              Request.connect("hr", option);
            } else {
              this.xinfo.amsgError(result.message);
            }
          }.bind(this)
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <XInfo ref={e => (this.xinfo = e)} />
        <Form className="login-form">
          <FormItem>
            {getFieldDecorator("accountName", {
              rules: [
                {
                  required: true,
                  message: this.context.intl.formatMessage({
                    id: "InputUsername"
                  })
                }
              ]
            })(
              <Input
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                placeholder={this.context.intl.formatMessage({
                  id: "accountName"
                })}
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: this.context.intl.formatMessage({
                    id: "InputPassword"
                  })
                }
              ]
            })(
              <Input
                prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                type="password"
                placeholder={this.context.intl.formatMessage({
                  id: "password"
                })}
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(
              <Checkbox>
                <FormattedMessage id="rememberMe" />
              </Checkbox>
            )}
            <a className="login-form-forgot" href="">
              <FormattedMessage id="forgotPassword" />
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={this.handleSubmit}
            >
              <FormattedMessage id="logIn" />
            </Button>
            Or
            <a href="">
              <FormattedMessage id="registerNow" />
            </a>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const XLoginForm = Form.create()(NormalLoginForm);

export default class XLogin extends React.Component {
  render() {
    return (
      <LocaleProvider locale={new Context().lang.antd}>
        <IntlProvider
          locale={navigator.language}
          messages={new Context().lang.cust}
        >
          <div className="loginArea">
            <header>
              <div className="logoImg">
                <img src="img/admin.jpg" />
              </div>
              <p>ZWJ ADMIN</p>
              <h2  style={{textAlign:"center"}}>
                <FormattedMessage id="logIn" />
              </h2>
            </header>
            <article>
              <Row style={{ maxWidth: 800, margin: "auto" }}>
                <Col
                  sm={{ span: 12, offset: 6 }}
                  md={{ span: 12, offset: 6 }}
                  lg={{ span: 12, offset: 6 }}
                  xl={{ span: 12, offset: 6 }}
                >
                  <section>
                    <div className="col-lg-4 col-md-4  col-sm-4 col-xs-12 col-sm-offset-4  col-md-offset-2 col-lg-offset-2">
                      <div className="page-header" />
                      <XLoginForm />
                    </div>
                  </section>
                </Col>
              </Row>
            </article>
            <footer>
              <p>2016 绪正达成(北京)科技有限公司 123456号</p>
            </footer>
          </div>
        </IntlProvider>
      </LocaleProvider>
    );
  }
}
// ReactDOM.render(<XLogin />, document.getElementById("login"));

// import React from 'react';
// import ReactDom from 'react-dom';
// import {Provider} from 'react-redux';
// import {createStore} from 'redux';
// import reducer from '../reducers/index.js';
// import App from '../containers/App.js';

// let store = createStore(reducer);

// ReactDom.render(
//     <Provider store={store}>
//         <App/>
//     </Provider>,
//     document.getElementById('root')
// );
