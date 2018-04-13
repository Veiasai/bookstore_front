import React, {Component} from 'react';
import {Table, Input, DatePicker, Row, Col, Spin} from 'antd';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-keeper'

const {RangePicker} = DatePicker;
const Search = Input.Search;

const columns = [{
    title: 'OrderID',
    dataIndex: 'id',
    render: (text, record) => {
        return (<Link to={'order/' + text}>{text}</Link>);
    }
}, {
    title: 'books',
    dataIndex: 'books',
    render: (text, record) => {
        return text.length > 1 ? text[0].bookName + '...' : text[0].bookName;
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
    search = (value) => {
        let conditions = {
            searchText: value,
            dateRange: this.orderStore.dateRange
        };
        this.orderStore.orderSearch(conditions);
    };

    constructor(props) {
        super(props);
        this.orderStore = this.props.rootStore.orderStore;
        this.orderStore.orderSearch({});
    }

    render() {
        return (
            <Spin spinning={this.orderStore.loading}>
                <Row>
                    <Col span={12}>
                        <RangePicker
                            defaultValue={this.orderStore.dateRange}
                            onChange={(date, dateString) => {
                                console.log(date, dateString);
                                this.orderStore.dateRange = date;
                            }}
                        />
                    </Col>
                    <Col span={12}>
                        <Search
                            placeholder="input search text"
                            onSearch={this.search}
                            enterButton
                        />
                    </Col>
                </Row>
                <br/><br/>
                <Table columns={columns}
                       rowKey={"id"}
                       dataSource={this.orderStore.orders.toJS()}
                       loading={this.orderStore.loading}
                />
            </Spin>
        );
    }
}

export default Userorders;