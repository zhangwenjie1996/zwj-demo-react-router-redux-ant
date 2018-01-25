import React, { Component, PropTypes } from "react";
import MainLayout from "../layouts/MainLayout/MainLayout";
import IndexView from "./Views/Index";
import FormBasic from "./Views/form/FormBasic";
import FormManage from "./Views/form/FormManage";
import TableBasic from "./Views/table/TableBasic";
import TableComplex from "./Views/table/TableComplex";
import QueryTable from "./Views/table/QueryTable";
import XDrag from "./Views/drag/Drag";
import MyEditor from "./Views/editor/MyEditor";
import BasicAnimation from "./Views/animation/BasicAnimation";
import ExampleAnimations from "./Views/animation/ExampleAnimations";
import XEcharts from "./Views/charts/Echarts";
import RightContextmenu from "./Views/RightContextmenu";
import Todo from "./Views/todos/components/App";
import EleAuthorize from "./Views/authorize/EleAuthorize";
import PageAuthorize from "./Views/authorize/PageAuthorize";
import NotFound from "./NotFound";
import CarouselBasic from "./Views/CarouselBasic";
import CollapseBasic from "./Views/CollapseBasic";
import ModalBasic from "./Views/modal/ModalBasic";
import Login from "./loginEntry";
import { Breadcrumb } from "antd";
import { XNavigation, XWorktab } from "../component";
import EnquiryForm from "./Views/form/enquiryform/enquiryForm";
import BillForm from "./Views/form/billform/billForm";
import SingleForm from "./Views/form/singleform/singleForm";
import DoubleForm from "./Views/form/doubleform/doubleForm";
import MultipleForm from "./Views/form/multipleform/multipleForm";
import ComplexTable from "./Views/table/complextable/complexTable";


export default class App extends Component{
  componentDidMount(){

  }

  render(){
    let { location, routes, params, children }=this.props;
    let  View;
  console.log("location", location, routes, params, children);
 View = IndexView;
  const path =  location.pathname;
  if (path == "/login") {
    View = Login;
    return <View />;
  }
  if (path == "/") {
    View = IndexView;
  }

  if (path == "/form1") {
    View = EnquiryForm;
  }
  if (path == "/form2") {
    View = BillForm;
  }
  if (path == "/form3") {
    View = SingleForm;
  }
  if (path == "/form4") {
    View = DoubleForm;
  }
  if (path == "/form5") {
    View = MultipleForm;
  }
  if (path == "/table1") {
    View = EnquiryForm;
  }
  if (path == "/table2") {
    View = ComplexTable;
  }
  if (path == "/table3") {
    View = QueryTable;
  }
  if (path == "/drag") {
    View = XDrag;
  }
  if (path == "/draft") {
    View = MyEditor;
  }
  if (path == "/basicAnimate") {
    View = BasicAnimation;
  }
  if (path == "/exmapleAnimate") {
    View = ExampleAnimations;
  }
  if (path == "/echarts") {
    View = XEcharts;
  }
  if (path == "/todo") {
    View = Todo;
  }
  if (path == "/contextmenu") {
    View = RightContextmenu;
  }
  if (path == "/eleAuthorize") {
    View = EleAuthorize;
  }
  if (path == "/pageAuthorize") {
    View = PageAuthorize;
  }

  if (path == "/404") {
    View = NotFound;
  }

  if (path == "/carousel") {
    View = CarouselBasic;
  }
  if (path == "/collapse") {
    View = CollapseBasic;
  }
  if (path == "/modal") {
    View = ModalBasic;
  }
  console.log(" this.props.children[0]", this);
  // this.refs.worktab?this.refs.worktab.createTab("link", location.pathname, location.pathname):null;
  return (
    <MainLayout>
      <XNavigation
        ref={e => (this.navigation = e)}
        menuClick={(icon, title, url) => {
          console.log(" this.props.children[0]", View);
          setTimeout(() => {
          this.refs.worktab.createTab(icon, title, url);
          
          }, 0);
        }}
      />
      <XWorktab ref="worktab" View={<View/>}/>
    </MainLayout>
  )};
}

// const App = ({ location, routes, params, children }) => {
//   console.log("location", location, routes, params, children);
//   let View = IndexView;
//   const path = { location }.location.pathname;
//   if (path == "/login") {
//     View = Login;
//     return <View />;
//   }
//   if (path == "/") {
//     View = IndexView;
//   }

//   if (path == "/form1") {
//     View = FormBasic;
//   }
//   if (path == "/form2") {
//     View = FormManage;
//   }
//   if (path == "/table1") {
//     View = TableBasic;
//   }
//   if (path == "/table2") {
//     View = TableComplex;
//   }
//   if (path == "/table3") {
//     View = QueryTable;
//   }
//   if (path == "/drag") {
//     View = XDrag;
//   }
//   if (path == "/draft") {
//     View = MyEditor;
//   }
//   if (path == "/basicAnimate") {
//     View = BasicAnimation;
//   }
//   if (path == "/exmapleAnimate") {
//     View = ExampleAnimations;
//   }
//   if (path == "/echarts") {
//     View = XEcharts;
//   }
//   if (path == "/todo") {
//     View = Todo;
//   }
//   if (path == "/contextmenu") {
//     View = RightContextmenu;
//   }
//   if (path == "/eleAuthorize") {
//     View = EleAuthorize;
//   }
//   if (path == "/pageAuthorize") {
//     View = PageAuthorize;
//   }

//   if (path == "/404") {
//     View = NotFound;
//   }

//   if (path == "/carousel") {
//     View = CarouselBasic;
//   }
//   if (path == "/collapse") {
//     View = CollapseBasic;
//   }
//   if (path == "/modal") {
//     View = ModalBasic;
//   }
//   console.log("-----------------------", View,this);

//   // return (
//   //   <MainLayout >
//   //      {children || '首页'}<Breadcrumb routes={routes} params={params} />
//   //      <br/>
//   // <XWorktab ref="worktab" view={<View/>}/>

//   //   </MainLayout>
//   // );

//   return (
//     <MainLayout>
//       <XNavigation
//         ref={e => (this.navigation = e)}
//         menuClick={(icon, title, url) => {
//           console.log(" this.props.children[0]", this );
//           this.refs.worktab.createTab(icon, title, url);
//           // this.refs.worktab.createTab(icon, title, url);
//         }}
//       />
//       <XWorktab ref="worktab" />
//     </MainLayout>
//   );
// };

App.propTypes = {};

