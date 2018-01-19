import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Tooltip } from 'antd';
export default class XTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            selectedRows: []
        };
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.selectedRowKeys !== this.props.selectedRowKeys) {
            this.setState({
                selectedRowKeys: nextProps.selectedRowKeys,
            })
        }
        if (nextProps.selectedRows !== this.props.selectedRows) {
            this.setState({
                selectedRows: nextProps.selectedRows,
            })
        }
    }

    onChangeOne = () => {
        this.setState({
            selectedRowKeys: [],
            selectedRows: []
        });
        this.props.getSelectedRows([], []);
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, selectedRows });
        this.props.getSelectedRows(selectedRowKeys, selectedRows);
    }

    onRowClick = (record, index) => {
        const {selectedRowKeys, selectedRows} = this.state;
        selectedRowKeys[0] = record.key;
        selectedRows[0] = record;
        this.setState({
            selectedRowKeys: selectedRowKeys,
            selectedRows: selectedRows
        })
        this.props.getSelectedRows(selectedRowKeys, selectedRows);
    }

    render() {
        var newElements = this.props.children.map((item) => {
            if (!item.props.render) {
                let newElement = React.cloneElement(item, {
                    render: (text, record, index) => {
                        let title = text || text == 0 ? text + "" : "";
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

        const { selectedRowKeys } = this.state;
        const rowSelection = {
            type: "radio",
            selectedRowKeys,
            // 选中项发生变化的时的回调
            onChange: this.onSelectChange
        };

        let total = this.props.data && this.props.data.total ? this.props.data.total : 0;

        const pagination = {
            total: total,
            showSizeChanger: true,
            current: this.props.current,
            onShowSizeChange: (current, pageSize) => {
                this.props.reloadData(current, pageSize);
            },
            // 分页、排序、筛选变化时触发
            onChange: (current) => {
                this.props.reloadData(current);
            },
        };

        const modalPagination = {
            total: total,
            showSizeChanger: false,
            current: this.props.current,
            // 分页、排序、筛选变化时触发
            onChange: (current) => {
                this.props.reloadData(current);
            },
            defaultPageSize: 5,
            pageSize: 5,
            showQuickJumper: true
        };
        let dataSource = this.props.data && this.props.data.rows ? this.props.data.rows : this.props.data;
        dataSource = JSON.stringify(dataSource) == "{}" ? [] : dataSource;
        return <div className="tableEllipsis">
            <Table bordered rowSelection={rowSelection} columns={newColumns} onRow={(record, index) => ({
            onClick: () => {
              this.onRowClick(record, index);
            }
          })} dataSource={dataSource} pagination={this.props.pType == "mPagination" ? modalPagination : pagination}  >{newElements}</Table>
        </div>
    }
}