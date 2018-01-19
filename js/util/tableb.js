import React from "react";
import ReactDOM from "react-dom";
import { Table, Button, Tooltip } from "antd";
import $ from "jquery";

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
        selectedRowKeys: nextProps.selectedRowKeys
      });
    }
    if (nextProps.selectedRows !== this.props.selectedRows) {
      this.setState({
        selectedRows: nextProps.selectedRows
      });
    }
  }

  // defaultSelect = (selectedRowKeys, selectedRows) => {
  //     console.log("defaultSelect", selectedRowKeys, selectedRows)
  //     this.onSelectChange(selectedRowKeys, selectedRows)
  //     // this.setState({
  //     //     selectedRowKeys: [3, 4],
  //     // })
  // }

  onChangeOne = () => {
    this.setState({
      selectedRowKeys: [],
      selectedRows: []
    });
    this.props.getSelectedRows([], []);
  };

  // 选中项发生变化的回调(只针对点击选择单选复选框 而不是整行row)
  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
    this.props.getSelectedRows(selectedRowKeys, selectedRows);
  };

  // 清空默认选中项
  clearSelectedRows = () => {
    this.setState({
      selectedRowKeys: [],
      selectedRows: []
    });
    // this.props.getSelectedRows([], []);
  };

  // 点击行时触发
  onRowClick = (record, index) => {
    const { selectedRowKeys, selectedRows } = this.state;
    selectedRowKeys[0] = record.key;
    selectedRows[0] = record;
    this.setState({
      selectedRowKeys: selectedRowKeys,
      selectedRows: selectedRows
    });
    this.props.getSelectedRows
      ? this.props.getSelectedRows(selectedRowKeys, selectedRows)
      : null;
  };

  //多行选择checkbox
  onRowCheckBoxClick = (record, index) => {
    const { selectedRowKeys, selectedRows } = this.state;
    let id = record.key;
    let indexKey = $.inArray(id, selectedRowKeys);
    if (indexKey == -1) {
      selectedRowKeys.push(id);
      selectedRows.push(record);
    } else {
      selectedRowKeys.splice(indexKey, 1);
      selectedRows.splice(indexKey, 1);
    }
    this.setState({
      selectedRowKeys: selectedRowKeys,
      selectedRows: selectedRows
    });
    //  console.log("多行选择checkbox", selectedRowKeys, selectedRows);
    this.props.getSelectedRows
      ? this.props.getSelectedRows(selectedRowKeys, selectedRows)
      : null;
  };

  render() {
    let newColumns = this.props.columns.map(item => {
      if (!item.render) {
        item.render = (text, record, index) => {
          let title = text || text == 0 ? text + "" : "";
          return (
            <Tooltip placement="top" title={title}>
              {text}
            </Tooltip>
          );
        };
      }
      return item;
    });
    const { selectedRowKeys, selectedRows } = this.state;
    const { type } = this.props;
    const rowSelection = {
      type: type || "radio", //单复选 不写默认单选
      selectedRowKeys,
      selectedRows,
      // 选中项发生变化的时的回调
      onChange: this.onSelectChange
    };

    let total =
      this.props.data && this.props.data.total ? this.props.data.total : 0;

    const pagination = {
      total: total,
      showSizeChanger: true,
      current: this.props.current,
      onShowSizeChange: (current, pageSize) => {
        this.props.reloadData ? this.props.reloadData(current, pageSize) : null;
      },
      // 分页、排序、筛选变化时触发
      onChange: (current, pageSize) => {
        this.props.reloadData ? this.props.reloadData(current, pageSize) : null;
      }
    };

    const modalPagination = {
      total: total,
      showSizeChanger: false,
      current: this.props.current,
      // 分页、排序、筛选变化时触发
      onChange: (current, pageSize) => {
        this.props.reloadData ? this.props.reloadData(current, pageSize) : null;
      },
      defaultPageSize: 5,
      pageSize: 5,
      showQuickJumper: true
    };
    // mPagination:模态框跳转分页  null不显示分页  默认是普通分页
    // 若table不要选择框 则子组件赋rowSelection = "null"
    // scroll:横向或纵向支持滚动，也可用于指定滚动区域的宽高度：{{ x: true, y: 300 }}
    // 对于列数很多的数据，可以固定前后的列，横向滚动查看其它数据，需要和 scroll.x 配合使用。
    // 若列头与内容不对齐或出现列重复，请指定列的宽度 width。
    // 建议指定 scroll.x 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 scroll.x。

    // 废弃以下属性 onRowClick，onRowDoubleClick、onRowContextMenu、onRowMouseEnter、onRowMouseLeave，请使用 onRow 代替。
    // <Table onRow={(record) => ({
    //   onClick: () => {},
    //   onDoubleClick: () => {},
    //   onContextMenu: () => {},
    //   onMouseEnter: () => {},
    //   onMouseLeave: () => {},
    // })} />
    let dataSource =
      this.props.data && this.props.data.rows
        ? this.props.data.rows
        : this.props.data;
    dataSource = JSON.stringify(dataSource) == "{}" ? [] : dataSource;
    return (
      <div className="tableEllipsis">
        <Table
          bordered
          scroll={this.props.scroll}
          rowSelection={this.props.rowSelection == "null" ? null : rowSelection}
          columns={newColumns}
          onRow={(record, index) => ({
            onClick: () => {
                this.props.onRowClick?this.props.onRowClick(record, index):null;
            }
          })}
          onChange={this.props.onChange}
          dataSource={dataSource}
          pagination={
            this.props.pType == "mPagination"
              ? modalPagination
              : this.props.pType == "null" ? false : pagination
          }
        />
      </div>
    );
  }
}
