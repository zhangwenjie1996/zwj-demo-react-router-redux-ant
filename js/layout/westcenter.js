import React from 'react';
import { Row, Col, LocaleProvider } from 'antd';
import { XAuthorization } from '../component';
//国际化
import { IntlProvider } from 'react-intl';
import Context from '../util/context';
import XInfo from '../util/infomation';

export default class WestCenter extends React.Component {

    constructor(props) {
        super(props);
        this.page = "";
        this.content = {
            west: {
                xs: 24,
                sm: 7,
                md: 7,
                lg: 7,
                data: {}
            },
            east: {
                xs: 24,
                sm: 17,
                md: 17,
                lg: 17,
                data: {}
            },
            north: {
                xs: 24,
                sm: 17,
                md: 17,
                lg: 17,
                data: {}
            },
            center: {
                xs: 24,
                sm: 17,
                md: 17,
                lg: 17,
                data: {}
            }

        };
    }

    render() {
        let param = document.location.search;
        this.page = param.substring(param.lastIndexOf("=") + 1, param.length);
        this.renderElement();
        this.xinfo = this.refs.info;
        const jsx = <LocaleProvider locale={new Context().lang.antd} >
            <IntlProvider locale={navigator.language} messages={new Context().lang.cust}>
                <XAuthorization page={this.page}>
                    <Row gutter={16} style={{ margin: 0 }}>
                        <XInfo ref="info" />
                        <Col xs={this.content.west.xs} sm={this.content.west.sm} md={this.content.west.md} lg={this.content.west.lg}>{this.content.west.data}</Col>
                        <Col xs={this.content.east.xs} sm={this.content.east.sm} md={this.content.east.md} lg={this.content.east.lg}>
                            <Row>

                                <Col >{this.content.center.data}</Col>
                            </Row>
                        </Col>
                    </Row>
                </XAuthorization>
            </IntlProvider>
        </LocaleProvider >;

        return (
            jsx
        );
    }
}