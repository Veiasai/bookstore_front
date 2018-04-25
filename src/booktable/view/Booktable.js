import React, {Component} from 'react';
import {Table, Input, Button, Icon} from 'antd';
import {Link} from 'react-keeper';
import {observer} from 'mobx-react';
import {inject} from "mobx-react/index";
import moment from 'moment';

@inject(['rootStore'])
@observer
class Booktable extends Component {
    constructor(props) {
        super(props);
        this.bookStore = this.props.rootStore.bookStore;
        this.managerStore = this.props.rootStore.managerStore;
        this.bookStore.init();
    }

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
            }, {
                title: 'Name',
                dataIndex: 'bookName',
                key: 'name',
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
            }, {
                title: 'Valid',
                dataIndex: 'valid',
                key: 'valid',
                render: (text, record) => {
                    return record.valid ? "True" : "False";
                }
            }, {
                title: 'Edit',
                render: (text, record) => {
                    return (
                        <a onClick={() => {}}>Edit</a>
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