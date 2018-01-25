import React from 'react';
import { Button,Icon  } from 'antd';
import styles from './NotFound.less';
console.log("styles",styles)
const NotFound = () => {
  return (
    <div className="normal 404">
      <div className="container">
        <h1 className="notfound animated   hinge">404</h1>
        <p className="desc">sorry,你要找的页面飞啦</p>
        <a href="/"><Button type="primary"  icon="arrow-left" style={{ marginTop: 10 }}>返回首页</Button></a>
      </div>
    </div>
  );
};

export default NotFound;
