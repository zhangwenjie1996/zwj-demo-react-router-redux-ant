import React from 'react';
import { Row, Col, LocaleProvider } from 'antd';
import { XAuthorization } from '../component';
//国际化
import { IntlProvider } from 'react-intl';
import Context from '../util/context';
import XInfo from '../util/infomation';

export default class NorthCenterSouth extends React.Component {

    constructor(props) {
        super(props);

        this.content = {
            south: {
                xs: 24,
                sm: 24,
                md: 24,
                lg: 24,
                data: {}
            },
            north: {
                xs: 24,
                sm: 24,
                md: 24,
                lg: 24,
                data: {}
            },
            center: {
                xs: 24,
                sm: 24,
                md: 24,
                lg: 24,
                data: {}
            }

        };
    }

    render() {
        let param = document.location.search;
        this.page = param.substring(param.lastIndexOf("=") + 1, param.length);
        this.xinfo = this.refs.info;
        this.renderElement();
        const jsx = <LocaleProvider locale={new Context().lang.antd} >
            <IntlProvider locale={navigator.language} messages={new Context().lang.cust}>
                <XAuthorization page={this.page}>
                    <XInfo ref="info" />
                    <Row gutter={16} style={{ margin: 0 }}>
                        <Col xs={this.content.north.xs} sm={this.content.north.sm} md={this.content.north.md} lg={this.content.north.lg}>{this.content.north.data}</Col>
                        <Col xs={this.content.center.xs} sm={this.content.center.sm} md={this.content.center.md} lg={this.content.center.lg}>{this.content.center.data}</Col>
                        <Col xs={this.content.south.xs} sm={this.content.south.sm} md={this.content.south.md} lg={this.content.south.lg}>{this.content.south.data}</Col>
                    </Row>
                </XAuthorization>
            </IntlProvider>
        </LocaleProvider >;

        return (
            jsx
        );
    }
}