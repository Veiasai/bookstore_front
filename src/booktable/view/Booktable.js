import React, {Component} from 'react';
import {Table, Input, Button, Icon} from 'antd';
import {Link} from 'react-keeper';
import {observer} from 'mobx-react';
import {inject} from "mobx-react/index";

@inject(['rootStore'])
@observer
class Booktable extends Component {
    constructor(props) {
        super(props);
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
            }, {
                title: 'Date',
                dataIndex: 'bookDate',
                key: 'date',
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