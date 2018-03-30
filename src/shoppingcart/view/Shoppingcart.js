import React, {Component} from 'react';
import {Link} from 'react-keeper';
import {Table, InputNumber, Icon, Button} from 'antd';
import {inject, observer} from 'mobx-react';
import {computed} from 'mobx'

@observer
@inject(['rootStore'])
class Shoppingcart extends Component {

    updateBookCount = (bookID, num) => {
        let newbook = {
            bookCount: num,
        };
        this.cartStore.updateBook(bookID, newbook);
    };

    deleteBook = (bookID) => {
        console.log("delete", bookID);
        this.cartStore.deleteBook(bookID);
        this.setState({data: this.cartStore.data.toJS()});
    };

    constructor(props) {
        super(props);
        this.cartStore = this.props.rootStore.cartStore;
        this.state = {
            data: this.cartStore.data.toJS(),
            loading: false,
        };
    }

    render() {
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

        return <Table columns={columns} dataSource={this.state.data}
                      loading={this.state.loading}/>;
    }
}

export default Shoppingcart;