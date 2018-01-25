import React, { PropTypes,Component } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import App from '../module/App';
import NotFound from '../module/NotFound';

const Routes = ({ history }) => {
  console.log("history", history, { history })
  return (
    <Router history={history}>
      <Route path="/" component={App} breadcrumbName="首页" />
      <Route path="login" component={App} />
        <Route path="form1" component={App} breadcrumbName="表单查询实例" />
        <Route path="form2" component={App} breadcrumbName="单据实例" />
        <Route path="form3" component={App} breadcrumbName="单列表单管理" />
        <Route path="form4" component={App} breadcrumbName="双列表单管理" />
        <Route path="form5" component={App} breadcrumbName="组合表单输入" />
        <Route path="table1" component={App} breadcrumbName="基础表格" />
        <Route path="table2" component={App} breadcrumbName="高级表格" />
        <Route path="table3" component={App} breadcrumbName="查询表格" />
        <Route path="drag" component={App} breadcrumbName="拖拽" />
        <Route path="draft" component={App} breadcrumbName="富文本" />
        <Route path="basicAnimate" component={App} breadcrumbName="基础动画" />
        <Route path="exmapleAnimate" component={App} breadcrumbName="动画实例" />
        <Route path="echarts" component={App} breadcrumbName="图表" />
        <Route path="todo" component={App} breadcrumbName="待办事项" />
        <Route path="contextmenu" component={App} breadcrumbName="右击面板" />
        <Route path="eleAuthorize" component={App} breadcrumbName="元素权限" />
        <Route path="pageAuthorize" component={App} breadcrumbName="页面权限" />
        <Route path="404" component={App} breadcrumbName="404" />
        
        <Route path="carousel" component={App} breadcrumbName="carousel" />
        <Route path="collapse" component={App} breadcrumbName="collapse" />
        <Route path="modal" component={App} breadcrumbName="modal" />
      <Route path="*" component={NotFound} />

    </Router>);
}

Routes.propTypes = {
  history: PropTypes.any,
};
export default Routes;
