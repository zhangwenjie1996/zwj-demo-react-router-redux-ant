import React from 'react';
import { Row, Col, LocaleProvider } from 'antd';
import { XAuthorization } from '../component';
//国际化
import { IntlProvider } from 'react-intl';
import Context from '../util/context';
import XInfo from '../util/infomation';
import Event from '../util/event';

export default class Center extends React.Component{

    constructor(props) {
        super(props);
        this.page = "";
        this.content = {
            center: {
                xs: 24,
                sm: 24,
                md: 24,
                lg: 24,
                data: {}
            }

        };

    }
//     componentDidMount(){
//     var mySubscriber = function( msg, data ){
//     console.log( msg, data );
// };
// var token = PubSub.subscribe( 'newtab', mySubscriber );

//   }
    render() {
        // this.abc()
        let param = document.location.search;
        this.page = param.substring(param.lastIndexOf("=") + 1, param.length);
        this.xinfo = this.refs.info;
        this.renderElement();
        const jsx = <LocaleProvider locale={new Context().lang.antd} >
            <IntlProvider locale={navigator.language} messages={new Context().lang.cust}>
                <XAuthorization page={this.page}>
                    <XInfo ref="info" />
                    <Row gutter={16} style={{ margin: 0 }}>
                        <Col xs={this.content.center.xs} sm={this.content.center.sm} md={this.content.center.md} lg={this.content.center.lg}>{this.content.center.data}</Col></Row>
                </XAuthorization>

            </IntlProvider>
        </LocaleProvider >;
        return (
            jsx
        );
    }
}