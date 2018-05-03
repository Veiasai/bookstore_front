import React, {Component} from 'react';
import {Table, Input, Button, Icon, Popconfirm, Radio} from 'antd';
import {Link} from 'react-keeper';
import {observer} from 'mobx-react';
import {inject} from "mobx-react/index";
import moment from 'moment';

const RadioGroup = Radio.Group;

const EditableCell = ({ editable, value, onChange }) => (
    <div>
        {editable
            ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
            : value
        }
    </div>
);

@inject(['rootStore'])
@observer
class Booktable extends Component {
    constructor(props) {
        super(props);
        this.bookStore = this.props.rootStore.bookStore;
        this.managerStore = this.props.rootStore.managerStore;
        this.bookStore.init();
    }

    renderColumns(text, record, column) {
        return (
            <EditableCell
                editable={record.editable}
                value={text}
                onChange={value => this.handleChange(value, record.bookID, column)}
            />
        );
    }

    handleChange(value, key, column) {
        const newData = [...this.bookStore.data];
        const target = newData.filter(item => key === item.bookID)[0];
        if (target) {
            target[column] = value;
            this.bookStore.data = newData;
        }
        console.log(newData);
    }

    edit(key) {
        const newData = [...this.bookStore.data];
        const target = newData.filter(item => key === item.bookID)[0];
        if (target) {
            target.editable = true;
            this.bookStore.data = newData;
        }
    }

    save(key) {
        const newData = [...this.bookStore.data];
        const target = newData.filter(item => key === item.bookID)[0];
        if (target) {
            delete target.editable;
            this.bookStore.data = newData;
            this.managerStore.postBook(target, false);
        }
    }

    cancel(key) {
        const newData = [...this.bookStore.data];
        const target = newData.filter(item => key === item.bookID)[0];
        if (target) {
            Object.assign(target, this.bookStore.cacheData.filter(item => key === item.bookID)[0]);
            delete target.editable;
            this.bookStore.data = newData;
        }
    }

    delete(key) {
        const newData = [...this.bookStore.data];
        const target = newData.filter(item => key === item.bookID)[0];
        if (target) {
            this.managerStore.postBook(target, true);
            this.bookStore.data = newData.filter(item => key !== item.bookID);
        }
    }

    changeValid = (e, id) => {
        const newData = [...this.bookStore.data];
        const target = newData.filter(item => id === item.bookID)[0];
        if (target) {
            target.valid = e.target.value;
            this.bookStore.data = newData;
            this.managerStore.postBook(target, false);
        }
    };
    
    render() {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'bookName',
                key: 'name',
                render: (text, record) => <Link to={"/book/" + record.bookID + "/" + record.bookName}>{text}</Link>,
            },
            {
                title: 'Writer',
                dataIndex: 'bookWriter',
                key: 'writer',
            }, {
                title: 'Class',
                dataIndex: 'bookClass',
                key: 'class',
                render: (text, record) => {
                    return this.bookStore.classCatalogue[text];
                }
            }, {
                title: 'Date',
                dataIndex: 'bookDate',
                key: 'date',
                render: (text, record) => {
                    return moment(text).format("YYYY-MM");
                }
            }, {
                title: 'Price',
                dataIndex: 'bookPrice',
                key: 'price',
            }, {
                title: 'Stock',
                dataIndex: 'bookStock',
                key: 'stock',
            }];

        const managerColumns = [
            {
                title: 'ID',
                dataIndex: 'bookID',
                key: 'id',
                width: '5%',
            }, {
                title: 'Name',
                dataIndex: 'bookName',
                key: 'name',
                width: '15%',
                render: (text, record) => this.renderColumns(text, record, 'bookName'),
            },
            {
                title: 'Writer',
                dataIndex: 'bookWriter',
                key: 'writer',
                width: '12%',
                render: (text, record) => this.renderColumns(text, record, 'bookWriter'),
            }, {
                title: 'Class',
                dataIndex: 'bookClass',
                key: 'class',
                width: '10%',
                render: (text, record) => {
                    return this.renderColumns(text, record, 'bookClass');
                }
            }, {
                title: 'Date',
                dataIndex: 'bookDate',
                key: 'date',
                width: '12%',
                render: (text, record) => {
                    return this.renderColumns(moment(text).format("YYYY-MM"), record, 'bookDate');
                }
            }, {
                title: 'Price',
                dataIndex: 'bookPrice',
                key: 'price',
                width: '8%',
                render: (text, record) => this.renderColumns(text, record, 'bookPrice'),

            }, {
                title: 'Stock',
                dataIndex: 'bookStock',
                key: 'stock',
                width: '8%',
                render: (text, record) => this.renderColumns(text, record, 'bookStock'),
            }, {
                title: 'Valid',
                dataIndex: 'valid',
                key: 'valid',
                width: '10%',
                render: (text, record) => (
                    <RadioGroup onChange={(e) => {
                        this.changeValid(e, record.bookID)
                    }} value={record.valid}>
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                    </RadioGroup>
                )
            }, {
                width: '15%',
                title: 'Edit',
                render: (text, record) => {
                    const {editable} = record;
                    return (
                        <div className="editable-row-operations">
                            {
                                editable ?
                                    <span>
                                        <a onClick={() => this.save(record.bookID)}>Save  </a>
                                        <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.bookID)}>
                                            <a>Cancel</a>
                                        </Popconfirm>
                                    </span>
                                    :
                                    <a onClick={() => this.edit(record.bookID)}>Edit</a>
                            }
                        </div>
                    );
                },
            }];

        return <Table columns={this.props.manager ? managerColumns : columns} dataSource={this.bookStore.data.toJS()}
                      rowKey={"bookID"}
                      pagination={this.bookStore.pagination}
                      loading={this.bookStore.loading}/>;
    }
}

export default Booktable;