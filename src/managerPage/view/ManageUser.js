import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {Link} from 'react-keeper';
import {Table, InputNumber, Button, Radio,} from 'antd';

const RadioGroup = Radio.Group;

@inject(['rootStore'])
@observer
class ManageUser extends Component {
    changeValid = (e, email) => {

    };

    constructor(props) {
        super(props);
        this.managerStore = this.props.rootStore.managerStore;
    }

    render() {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'userName',
                key: 'name',
            }, {
                title: 'Email',
                dataIndex: 'userEmail',
                key: 'email',
            }, {
                title: 'Account',
                dataIndex: 'userAccount',
                key: 'account',
                render: (text, record) => (
                    <span>
                        <InputNumber min={0} max={999999} defaultValue={record.userAccount}
                                     onChange={(value) => {
                                         ;
                                     }}/>
                    </span>
                ),
            }, {
                title: 'Vaild',
                dataIndex: 'userVaild',
                key: 'vaild',
                render: (text, record) => (
                    <RadioGroup onChange={(e) => {
                        this.changeValid(e, record.userEmail)
                    }} value={record.userValid}>
                        <Radio value={1}>Yes</Radio>
                        <Radio value={0}>No</Radio>
                    </RadioGroup>
                )
            }, {
                title: 'Delete',
                key: 'delete',
                render: (text, record) => (
                    <span><Button onClick={() => {
                    }} icon="minus-circle"/></span>
                ),
            }];

        return <Table columns={columns} dataSource={this.managerStore.userData.toJS()}
                      loading={this.managerStore.userloading}/>;
    }
}

export default ManageUser;