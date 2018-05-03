import React, {Component} from 'react';
import {Link} from 'react-keeper';
import {Table, InputNumber, Button} from 'antd';
import {inject, observer} from 'mobx-react';
import moment from "moment/moment";

@inject(['rootStore'])
@observer
class Cartbody extends Component {
    onSelectChange = (selectedRowKeys) => {
        this.cartStore.changeSelection(selectedRowKeys);
    };

    updateBookCount = (bookID, num) => {
        let newbook = {
            bookCount: num,
        };
        this.cartStore.updateBook(bookID, newbook);
    };

    deleteBook = (bookID) => {
        this.cartStore.deleteBook(bookID);
    };

    constructor(props) {
        super(props);
        this.cartStore = this.props.rootStore.cartStore;
        this.bookStore = this.props.rootStore.bookStore;
        if (this.cartStore.data.length === 0)
            this.cartStore.cartGet();
    }

    render() {
        const selectedRowKeys = this.cartStore.selectedRowKeys;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        const columns = [
            {
                title: 'Name',
                dataIndex: 'bookName',
                key: 'name',
                render: (text, record) => {
                    return (
                        <div>
                            <Link to={"/book/" + record.bookID + "/" + record.bookName}>{text}</Link>
                        </div>
                    )
                }
            }, {
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
                title: 'Count',
                dataIndex: 'bookCount',
                key: 'count',
                render: (text, record) => (
                    <span>
                        <InputNumber min={1} max={record.bookStock} defaultValue={record.bookCount}
                                     onChange={(value) => {
                                         this.updateBookCount(record.bookID, value);
                                     }}/>
                    </span>
                ),
            }, {
                title: 'Delete',
                key: 'delete',
                render: (text, record) => (
                    <span><Button onClick={() => {
                        this.deleteBook(record.bookID)
                    }} icon="minus-circle"/></span>
                ),
            }];

        return <Table rowSelection={rowSelection}
                      columns={columns}
                      dataSource={this.cartStore.data.toJS()}
                      loading={this.cartStore.loading}/>;
    }
}

export default Cartbody;