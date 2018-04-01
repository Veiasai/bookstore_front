import React, {Component} from 'react';
import {Link} from 'react-keeper';
import {Table, InputNumber, Icon, Button} from 'antd';
import {inject, observer} from 'mobx-react';
import {computed, observable} from 'mobx'


@inject(['rootStore'])
@observer
class Shoppingcart extends Component {
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
    }

    render() {
        const {cartStore} = this.props.rootStore;
        const columns = [
            {
                title: 'Name',
                dataIndex: 'bookName',
                key: 'name',
                render: (text, record) => <Link to={"/book/" + record.bookID + "/" + record.bookName}>{text}</Link>
            }, {
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
                    <span><Button onClick={()=>{this.deleteBook(record.bookID)}} icon="minus-circle"></Button></span>
                ),
            }];

        return <Table columns={columns} dataSource={cartStore.data.toJS()}
                      loading={cartStore.loading}/>;
    }
}

export default Shoppingcart;