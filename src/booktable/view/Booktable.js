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
        this.classStore = this.props.rootStore.classStore;
        this.bookStore = this.props.rootStore.bookStore;
        this.bookStore.init();
    }

    render() {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'bookName',
                key: 'name',
                render: (text,record) => <Link to={"/book/"+record.bookID + "/" + record.bookName }>{text}</Link>,
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
                    return this.classStore.catalogue[text];
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
            }];

        return <Table columns={columns} dataSource={this.bookStore.data.toJS()}
                      pagination={this.bookStore.pagination}
                      loading={this.bookStore.loading}/>;
    }
}

export default Booktable;