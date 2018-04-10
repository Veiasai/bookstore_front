import React, {Component} from 'react';
import {Table} from 'antd';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-keeper'

const columns = [{
    title: 'OrderID',
    dataIndex: 'id',
    render: (text, record)=>{
        return (<Link to={'order/' + text}>{text}</Link>);
    }
}, {
    title: 'books',
    dataIndex: 'books',
    render: (text, record)=>{
        return text.length > 1 ? text[0].bookName+'...' : text[0].bookName;
    }
}, {
    title: 'TotalPrice',
    dataIndex: 'totalPrice',
}, {
    title: 'Date',
    dataIndex: 'date',
}];

@inject(['rootStore'])
@observer
class Userorders extends Component {
    constructor(props) {
        super(props);
        this.orderStore = this.props.rootStore.orderStore;
    }
    render() {
        return (
            <div>
                <Table columns={columns}
                       rowKey={"id"}
                       dataSource={this.orderStore.orders}
                       loading={this.orderStore.loading}
                />
            </div>
        );
    }
}

export default Userorders;