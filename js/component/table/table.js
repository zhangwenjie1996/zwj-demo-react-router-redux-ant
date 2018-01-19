
import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Button, Table, Checkbox, Input, Popconfirm , Divider} from 'antd';
//编辑行中的列(cell)
class EditableCell extends React.Component {
    state = {
        value: this.props.value,
        editable: this.props.editable || false,
    }

    //nextProps :实例中(
    // <EditableCell editable={editable} value={text}   onChange={value => this.handleChange(key, index, value)}  status={status}  />
    // );所有的属性 第一列{editable:true,value:'Edward King 0',status:undefined}  并且渲染出  <div>
    //   <Input
    //     value={value}
    //     onChange={e => this.handleChange(e)}
    //     />
    // </div>

    //  第二列{editable:true,value:32,status:undefined} 第二列属性也改变
    //  并且渲染出  <div>
    //        <Input
    //             value={value}
    //             onChange={e => this.handleChange(e)}
    //     />
    // </div> 进而继续触发执行componentWillReceiveProps 

    //  第三列由于没有editable属性 所以不存在属性的变化 

    // 点击编辑 props中editable改变了 从而触发componentWillReceiveProps 
    componentWillReceiveProps(nextProps) {
        if (nextProps.editable !== this.state.editable) {
            alert(1);
            this.setState({ editable: nextProps.editable });//再次设置editable的值
            if (nextProps.editable) {
                this.cacheValue = this.state.value;
            }
        }
        if (nextProps.status && nextProps.status !== this.props.status) {
            alert(2);
            if (nextProps.status === 'save') {

                this.props.onChange(this.state.value);//点击保存触发onchange事件取handleChange(e)中设置的value即e.target.value值，传参即是e.target.value，执行相应的handlechange方法 进而存储新数据

            } else if (nextProps.status === 'cancel') {
                this.setState({ value: this.cacheValue });
                this.props.onChange(this.cacheValue);
            }
        }
    }
    //同理   props中editable改变了 从而也触发shouldComponentUpdate return返回true 继续往下进行render
    //  每列render renderColumns进而实例本行的第二列EditableCell 所以再次触发componentWillReceiveProps
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.editable !== this.state.editable ||
            nextState.value !== this.state.value;
    }
    //列中的input编辑输入 触发handleChange setState改变value状态 从而触发了 shouldComponentUpdate(nextProps, nextState) 
    handleChange(e) {
        const value = e.target.value;
        this.setState({ value });
    }
    render() {
        const { value, editable } = this.state;
        return (<div>
            {
                editable ?
                    <div>
                        <Input
                            value={value}
                            onChange={e => this.handleChange(e)}
                            />
                    </div>
                    :
                    <div className="editable-row-text">
                        {value || ' '}
                    </div>
            }
        </div>);
    }
}


class XTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: 'name',
            dataIndex: 'name',
            width: '25%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'name', text),
        }, {
            title: 'age',
            dataIndex: 'age',
            width: '15%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'age', text),
        }, {
            title: 'address',
            dataIndex: 'address',
            width: '40%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'address', text),
        }, {
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record, index) => {
                const { editable } = this.state.data[index].name;//首次操作之前editable为false
                return (<div className="editable-row-operations">
                    {
                        editable ?
                            <span>
                                <a onClick={() => this.editDone(index, 'save')}>更新</a>
                                <Divider type="vertical" />
                                <Popconfirm title="Sure to cancel?" onConfirm={() => this.editDone(index, 'cancel')}>
                                    <a>取消</a>
                                </Popconfirm>
                            </span>
                            :
                            <span>
                                <a onClick={() => this.edit(index)}>编辑</a> {/*点击编辑 改变了editable状态为true*/}
                            </span>
                    }
                </div>);
            },
        }];
        this.state = {
            data: [{
                key: '0',
                name: {
                    editable: false,
                    value: 'Edward King 0',
                },
                age: {
                    editable: false,
                    value: '0',
                },
                address: {
                    value: 'London, Park Lane no. 0',
                },
            }, {
                key: '1',
                name: {
                    editable: false,
                    value: 'Edward King 1',
                },
                age: {
                    editable: false,
                    value: '1',
                },
                address: {
                    value: 'London, Park Lane no.1',
                },
            }, {
                key: '2',
                name: {
                    editable: false,
                    value: 'Edward King 2',
                },
                age: {
                    editable: false,
                    value: '2',
                },
                address: {
                    value: 'London, Park Lane no. 2',
                },
            }],
        };
    }
    //生成复杂数据的渲染函数（对应渲染的列）
    renderColumns(data, index, key, text) {
        const { editable, status } = data[index][key];//默认data里editable为false
        if (typeof editable === 'undefined') {
            return text;
        }


        return (<EditableCell
            editable={editable}
            value={text}
            onChange={value => this.handleChange(key, index, value)}//value是上面传入的this.props.onChange(this.state.value)的参数
            status={status}
            />);
    }

    /*
     参数
     key:columns每项cell的列数据的key 'name' 'age' 'address'
     index: 行索引
     value:当前行的值
     */
    handleChange(key, index, value) {
        const { data } = this.state;
        data[index][key].value = value;
        this.setState({ data });
    }

    //编辑 改变editable状态为true 为true时候走判断dom变为 
    //  <span>
    //   <a onClick={() => this.editDone(index, 'save')}>Save</a>
    //   <Popconfirm title="Sure to cancel?" onConfirm={() => this.editDone(index, 'cancel')}>
    //     <a>Cancel</a>
    //   </Popconfirm>
    // </span>
    // 同时清除save/cancel的status  
    /*
    参数
    index:当前行索引
    type：状态 (save/cancel)
    */
    edit(index) {
        const { data } = this.state;
        Object.keys(data[index]).forEach((item) => {
            if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                data[index][item].editable = true;
            }
        });
        this.setState({ data });
    }

    //编辑完成(分为save的完成与cancel的完成) 改变editable状态为false status为type，不再是undefined，所以触发执行componentWillReceiveProps(nextProps) 进而在走  shouldComponentUpdate(nextProps, nextState)
    // 当editable为false时候走判断dom变为 <span>  <a onClick={() => this.edit(index)}>Edit</a>  </span> 同时清除save/cancel的status  
    /*
    参数
    index:当前行索引
    type：状态 (save/cancel)
    */

    editDone(index, type) {
        const { data } = this.state;
        // Object.keys(data[index]) 返回一个由给定对象的所有可枚举自身属性的属性名组成的数组[key,name,age,address]
        //[key,name,age,address].forEach 循环data每项中的每列
        Object.keys(data[index]).forEach((item) => {
            if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                data[index][item].editable = false;
                data[index][item].status = type;
            }
        });
        this.setState({ data }, () => {
            Object.keys(data[index]).forEach((item) => {
                if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                    delete data[index][item].status;
                }
            });
        });
    }


    render() {
        const { data } = this.state;
        const dataSource = data.map((item) => {
            const obj = {};
            Object.keys(item).forEach((key) => {
                obj[key] = key === 'key' ? item[key] : item[key].value;
            });
            return obj;//obj={key:'0',name:'Edward King 0',age:'32',address:'London, Park Lane no. 0'} dataSource=[obj]
        });

        const rowSelection = {
            onSelect: (record, selected, selectedRows) => {
                this.setState({
                    record: record
                });
                this.props.callbackParentRecord(record)
            }

        };
        const columns = this.columns;
        const pagination = {
            total: data.length,
            showSizeChanger: true,
            onShowSizeChange: (current, pageSize) => {
                console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange: (current) => {
                console.log('Current: ', current);
            },
        };
        return <div id="dragTable">
            <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns} pagination={pagination} />
        </div>;
    }
}

export default XTable;