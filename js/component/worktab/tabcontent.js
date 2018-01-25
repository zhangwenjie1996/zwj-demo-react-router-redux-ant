import React from 'react';
import { Spin } from 'antd';
import $ from 'jquery';
import ServerUrl from '../../util/serverurl';
import Resize from '../../util/resize'
import { Scrollbars } from 'react-custom-scrollbars';
//导航菜单
export default class XTabcontent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
      
    }

    createHtml(data) {
        return { __html: data };
    }
 
    render() { 
            return   <View />;
    }
}