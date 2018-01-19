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
        $(window).resize(function () {
            $(".east").height(new Resize().setIframeHight(""));
            $(".east").width(new Resize().setIframeWidth(""));
        });
        $(".east").height(new Resize().setIframeHight(""));
        $(".east").width(new Resize().setIframeWidth(""));
    }

    createHtml(data) {
        return { __html: data };
    }
 
    render() { 
        if (this.props.url.indexOf("/webapp/test/modeler.html")>-1) {
            return <iframe frameBorder={0} src={this.props.url}  ></iframe>;
        }
        var jsx = <iframe frameBorder={0} src={this.props.url}   ></iframe>;
        return jsx;
    }
}