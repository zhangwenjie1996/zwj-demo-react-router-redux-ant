import React from 'react';
import ReactDOM from 'react-dom';
import './title.less';
import { FormattedMessage } from 'react-intl';
import {Icon } from 'antd';
export default class XTitle extends React.Component {
    render() {
        return ( 
                <div className="title">
                  <Icon type="pushpin-o" style={{marginRight:6}}/><FormattedMessage id={this.props.text} />
                </div>
            
        );

    }

}
