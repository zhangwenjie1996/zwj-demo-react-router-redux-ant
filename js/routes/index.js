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
        <Route path="form1" component={App} breadcrumbName="基础表单" />
        <Route path="form2" component={App} breadcrumbName="表单管理" />
        <Route path="table1" component={App} breadcrumbName="基础表格" />
        <Route path="table2" component={App} breadcrumbName="复杂表格" />
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
