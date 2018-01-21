import React, { Component, PropTypes } from 'react';
import MainLayout from '../layouts/MainLayout/MainLayout';
import IndexView from './Views/Index';
import FormBasic from './Views/FormBasic';
import FormManage from './Views/FormManage';
import TableBasic from './Views/TableBasic';
import XSalaryManage from './Views/TableComplex';
import XDrag from './Views/Drag';
import MyEditor from './Views/MyEditor';
import BasicAnimation from './Views/animation/BasicAnimation';
import ExampleAnimations from './Views/animation/ExampleAnimations';
import XEcharts from './Views/charts/Echarts';
import RightContextmenu from './Views/RightContextmenu';

import Todo from './Views/todos/components/App';

import CarouselBasic from './Views/CarouselBasic';
import CollapseBasic from './Views/CollapseBasic';
import ModalBasic from './Views/ModalBasic';
import Login from './loginEntry';
import {  Breadcrumb } from "antd";

const App = ({ location,routes, params, children }) => {
  console.log("location",location,routes, params, children )
  let View = IndexView;
  const path = { location }.location.pathname;
   if (path == '/login') {
    View = Login;
    return (
        <View />   
    ) 
  }
  if (path == '/') {
    View = IndexView;
  }
 
  if (path == '/form1') {
    View = FormBasic;
  }
  if (path == '/form2') {
    View = FormManage;
  }
  if (path == '/table1') {
    View = TableBasic;
  }
  if (path == '/table2') {
    View = XSalaryManage;
  }
  if (path == '/drag') {
    View = XDrag;
  }
  if (path == '/draft') {
    View = MyEditor;
  }
  if (path == '/basicAnimate') {
    View = BasicAnimation;
  }
  if (path == '/exmapleAnimate') {
    View = ExampleAnimations;
  } 
  if (path == '/echarts') {
    View = XEcharts;
  }
  if (path == '/todo') {
    View = Todo;
  }
  if (path == '/contextmenu') {
    View = RightContextmenu;
  }
  
  if (path == '/carousel') {
    View = CarouselBasic;
  }
  if (path == '/collapse') {
    View = CollapseBasic;
  }
  if (path == '/modal') {
    View = ModalBasic;
  }
  return (
    <MainLayout> 
       {children || '首页'}<Breadcrumb routes={routes} params={params} />
       <br/>
      <View />  
    </MainLayout>
  );
};

App.propTypes = {
};

export default App;
