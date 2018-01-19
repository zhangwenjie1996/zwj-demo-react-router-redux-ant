import React from 'react';
import { Row, Col, LocaleProvider } from 'antd';
//国际化
import { IntlProvider } from 'react-intl';
import Context from '../util/context';
import XInfo from '../util/infomation';

export default class WestCenterEast extends React.Component {

    constructor(props) {
        super(props);

        this.content = {
            west: {
                xs: 24,
                sm: 6,
                md: 6,
                lg: 6,
                data: {}
            },
            east: {
                xs: 24,
                sm: 12,
                md: 12,
                lg: 12,
                data: {}
            },
            center: {
                xs: 24,
                sm: 6,
                md: 6,
                lg: 6,
                data: {}
            }

        };
    }

    render() {
        const jsx = <LocaleProvider locale={new Context().lang.antd} >
            <IntlProvider locale={navigator.language} messages={new Context().lang.cust}>
                <Row gutter={16} style={{ margin: 0 }}>
                    <Col xs={this.content.west.xs} sm={this.content.west.sm} md={this.content.west.md} lg={this.content.west.lg}>{this.props.children[0]} <XInfo ref="info" /></Col>
                    <Col xs={this.content.center.xs} sm={this.content.center.sm} md={this.content.center.md} lg={this.content.center.lg}> {this.props.children[1]} </Col>
                    <Col xs={this.content.east.xs} sm={this.content.east.sm} md={this.content.east.md} lg={this.content.east.lg}> {this.props.children[2]} </Col>
                </Row>
            </IntlProvider>
        </LocaleProvider >;

        return (
            jsx
        );
    }
}