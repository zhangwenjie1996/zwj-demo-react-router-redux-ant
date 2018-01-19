
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tooltip, Table } from 'antd';
const { Column, ColumnGroup } = Table;
import $ from 'jquery';
export default class XTableA extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var newElements = this.props.children.map((item) => {
               if (!item.props.render) {
                let newElement = React.cloneElement(item, {
                    render: (text, record, index) => {
                        let title = text || text == 0 ? text+"" : "";
                        return <Tooltip placement="top" title={title}>
                            {text}
                        </Tooltip>
                    }
                });
                return newElement;
            }
            else
                return item;
        });

        return (
            <Table className="tableEllipsis" onRow={(record, index) => ({
                onClick: () => {
                    this.props.onRowClick?this.props.onRowClick(record, index):null;
                }
              })}   rowSelection={this.props.rowSelection} dataSource={this.props.dataSource} bordered pagination={this.props.pagination}>
                {newElements}
            </Table>
        )
    }

}