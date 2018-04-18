import React, {Component} from 'react'
import {Input, Button, Table} from 'antd';
import {inject, observer} from "mobx-react/index";

@inject(['rootStore'])
@observer
class ManageSale extends Component {
    constructor(props) {
        super(props);
        this.managerStore = this.props.rootStore.managerStore;
        this.bookStore = this.props.rootStore.bookStore;
    }

    render() {
        const columns = [{
            title: 'BookID',
            dataIndex: 'bookID',
            key: 'bookid',
        }, {
            title: 'BookName',
            dataIndex: 'bookName',
            key: 'bookname',
        }, {
            title: 'BookWriter',
            dataIndex: 'bookWriter',
            key: 'bookwriter',
        }, {
            title: 'SaleDate',
            dataIndex: 'date',
            key: 'date',
        }, {
            title: 'userID',
            dataIndex: 'userID',
            key: 'userid',
        }, {
            title: 'BookCount',
            dataIndex: 'bookCount',
            key: 'bookcount',
        }, {
            title: 'BookPrice',
            dataIndex: 'bookPrice',
            key: 'bookprice',
        },{
            title: 'Class',
            dataIndex: 'bookClass',
            key: 'class',
            render: (text, record) => {
                return this.bookStore.classCatalogue[text];
            }
        }];
        return (<Table
            columns={columns}
            dataSource={this.managerStore.saleRecord.toJS()}
            loading={this.managerStore.saleRecordLoading}
        />)
    }
}

export default ManageSale;