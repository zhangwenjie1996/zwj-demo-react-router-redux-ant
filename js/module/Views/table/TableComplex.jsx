import React, { Component } from "react";
import { Table, Icon, Divider, Row, Col, Button, Input, Popconfirm } from "antd";

class TableComplex1 extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
        width: "12%"
      },
      {
        title: "Address",
        dataIndex: "address",
        width: "30%",
        key: "address"
      }
    ];

    this.data = [
      {
        key: 1,
        name: "John Brown sr.",
        age: 60,
        address: "New York No. 1 Lake Park",
        children: [
          {
            key: 11,
            name: "John Brown",
            age: 42,
            address: "New York No. 2 Lake Park"
          },
          {
            key: 12,
            name: "John Brown jr.",
            age: 30,
            address: "New York No. 3 Lake Park",
            children: [
              {
                key: 121,
                name: "Jimmy Brown",
                age: 16,
                address: "New York No. 3 Lake Park"
              }
            ]
          },
          {
            key: 13,
            name: "Jim Green sr.",
            age: 72,
            address: "London No. 1 Lake Park",
            children: [
              {
                key: 131,
                name: "Jim Green",
                age: 42,
                address: "London No. 2 Lake Park",
                children: [
                  {
                    key: 1311,
                    name: "Jim Green jr.",
                    age: 25,
                    address: "London No. 3 Lake Park"
                  },
                  {
                    key: 1312,
                    name: "Jimmy Green sr.",
                    age: 18,
                    address: "London No. 4 Lake Park"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        key: 2,
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park"
      }
    ];
    // rowSelection objects indicates the need for row selection
    this.rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      }
    };
  }

  render() {
    return (
      <Table
        columns={this.columns}
        dataSource={this.data}
        rowSelection={this.rowSelection}
      />
    );
  }
}
class TableComplex2 extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Full Name",
        width: 100,
        dataIndex: "name",
        key: "name",
        fixed: "left"
      },
      { title: "Age", width: 100, dataIndex: "age", key: "age", fixed: "left" },
      { title: "Column 1", dataIndex: "address", key: "1", width: 150 },
      { title: "Column 2", dataIndex: "address", key: "2", width: 150 },
      { title: "Column 3", dataIndex: "address", key: "3", width: 150 },
      { title: "Column 4", dataIndex: "address", key: "4", width: 150 },
      { title: "Column 5", dataIndex: "address", key: "5", width: 150 },
      { title: "Column 6", dataIndex: "address", key: "6", width: 150 },
      { title: "Column 7", dataIndex: "address", key: "7", width: 150 },
      { title: "Column 8", dataIndex: "address", key: "8" },
      {
        title: "Action",
        key: "operation",
        fixed: "right",
        width: 100,
        render: () => <a href="#">action</a>
      }
    ];
    this.data = [];
  }
  componentDidMount() {
    for (let i = 0; i < 100; i++) {
      this.data.push({
        key: i,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`
      });
    }
  }
  render() {
    return (
      <Table
        columns={this.columns}
        dataSource={this.data}
        scroll={{ x: 1500, y: 300 }}
      />
    );
  }
}
const EditableCell = ({ editable, value, onChange }) => (
    <div>
      {editable
        ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
        : value
      }
    </div>
  );
class TableComplex3 extends Component {
    constructor(props) {
        super(props);
        const data = [];
        for (let i = 0; i < 100; i++) {
          data.push({
            key: i.toString(),
            name: `Edrward ${i}`,
            age: 32,
            address: `London Park no. ${i}`,
          });
        }
    
        this.columns = [{
          title: 'name',
          dataIndex: 'name',
          width: '25%',
          render: (text, record) => this.renderColumns(text, record, 'name'),
        }, {
          title: 'age',
          dataIndex: 'age',
          width: '15%',
          render: (text, record) => this.renderColumns(text, record, 'age'),
        }, {
          title: 'address',
          dataIndex: 'address',
          width: '40%',
          render: (text, record) => this.renderColumns(text, record, 'address'),
        }, {
          title: 'operation',
          dataIndex: 'operation',
          render: (text, record) => {
            const { editable } = record;
            return (
              <div className="editable-row-operations">
                {
                  editable ?
                    <span>
                      <a onClick={() => this.save(record.key)}>Save</a>
                      <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                        <a>Cancel</a>
                      </Popconfirm>
                    </span>
                    : <a onClick={() => this.edit(record.key)}>Edit</a>
                }
              </div>
            );
          },
        }];
        this.state = { data };
        this.cacheData = data.map(item => ({ ...item }));
      }

      componentDidMount(){
      
      }
      renderColumns(text, record, column) {
        return (
          <EditableCell
            editable={record.editable}
            value={text}
            onChange={value => this.handleChange(value, record.key, column)}
          />
        );
      }
      handleChange(value, key, column) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target[column] = value;
          this.setState({ data: newData });
        }
      }
      edit(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target.editable = true;
          this.setState({ data: newData });
        }
      }
      save(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          delete target.editable;
          this.setState({ data: newData });
          this.cacheData = newData.map(item => ({ ...item }));
        }
      }
      cancel(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
          delete target.editable;
          this.setState({ data: newData });
        }
      }
      render() {
        return <Table bordered dataSource={this.state.data} columns={this.columns} />;
      }
  
}

export default class TableComplex extends Component {
  render() {
    return (
      <div id="Form">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} className="col-margin">
            <div className="form-block">
              <div className="form-demo-title">树形数据展示</div>
              <TableComplex1 />
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} className="col-margin">
            {" "}
            <div className="form-block">
              <div className="form-demo-title">固定头和列</div>
              <TableComplex2 />
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} className="col-margin">
            <div className="form-block">
              <div className="form-demo-title">可编辑行</div>
              <TableComplex3 />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
