import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {Table, InputNumber, Input, Button, Radio, Popconfirm} from 'antd';

const RadioGroup = Radio.Group;

const EditableCell = ({editable, value, onChange}) => (
    <div>
        {editable
            ? <Input style={{margin: '-5px 0'}} value={value} onChange={e => onChange(e.target.value)}/>
            : value
        }
    </div>
);

@inject(['rootStore'])
@observer
class ManageUser extends Component {
    changeValid = (e, id) => {
        const newData = [...this.managerStore.userData];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            target.valid = e.target.value;
            this.managerStore.userData = newData;
            this.managerStore.postUser(target);
        }
    };

    constructor(props) {
        super(props);
        this.managerStore = this.props.rootStore.managerStore;
        this.managerStore.getUser();
    }

    renderColumns(text, record, column) {
        return (
            <EditableCell
                editable={record.editable}
                value={text}
                onChange={value => this.handleChange(value, record.id, column)}
            />
        );
    }

    handleChange(value, key, column) {
        const newData = [...this.managerStore.userData];
        const target = newData.filter(item => key === item.id)[0];
        if (target) {
            target[column] = value;
            this.managerStore.userData = newData;
        }
        console.log(newData);
    }

    edit(key) {
        const newData = [...this.managerStore.userData];
        const target = newData.filter(item => key === item.id)[0];
        if (target) {
            target.editable = true;
            this.managerStore.userData = newData;
        }
    }

    save(key) {
        const newData = [...this.managerStore.userData];
        const target = newData.filter(item => key === item.id)[0];
        if (target) {
            delete target.editable;
            this.managerStore.userData = newData;
            this.managerStore.postUser(target);
        }
    }

    cancel(key) {
        const newData = [...this.managerStore.userData];
        const target = newData.filter(item => key === item.id)[0];
        if (target) {
            Object.assign(target, this.managerStore.userCacheData.filter(item => key === item.id)[0]);
            delete target.editable;
            this.managerStore.userData = newData;
        }
    }

    delete(key) {
        const newData = [...this.managerStore.userData];
        const target = newData.filter(item => key === item.id)[0];
        if (target) {
            this.managerStore.deleteUser(target);
            this.managerStore.userData = newData.filter(item => key !== item.id);
        }
    }
    render() {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: '10%',
            },
            {
                title: 'Name',
                dataIndex: 'username',
                key: 'name',
                width: '17%',
                render: (text, record) => this.renderColumns(text, record, 'username'),
            }, {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                width: '17%',
                render: (text, record) => this.renderColumns(text, record, 'email'),
            }, {
                title: 'Password',
                dataIndex: 'password',
                key: 'password',
                width: '17%',
                render: (text, record) => this.renderColumns(text, record, 'password'),
            }, {
                title: 'operation',
                dataIndex: 'operation',
                width: '15%',
                render: (text, record) => {
                    const {editable} = record;
                    return (
                        <div className="editable-row-operations">
                            {
                                editable ?
                                    <span>
                                        <a onClick={() => this.save(record.id)}>Save  </a>
                                        <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.id)}>
                                            <a>Cancel</a>
                                        </Popconfirm>
                                    </span>
                                    :
                                    <a onClick={() => this.edit(record.id)}>Edit</a>
                            }
                        </div>
                    );
                },
            }, {
                title: 'Vaild',
                dataIndex: 'vaild',
                key: 'vaild',
                width: '15%',
                render: (text, record) => (
                    <RadioGroup onChange={(e) => {
                        this.changeValid(e, record.id)
                    }} value={record.valid}>
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                    </RadioGroup>
                )
            }, {
                title: 'Delete',
                key: 'delete',
                width: '10%',
                render: (text, record) => (
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.delete(record.id)}>
                        <a>delete</a>
                    </Popconfirm>
                ),
            }];

        return <Table columns={columns} dataSource={this.managerStore.userData.toJS()}
                      rowKey={"id"}
                      loading={this.managerStore.userloading}/>;
    }
}

export default ManageUser;