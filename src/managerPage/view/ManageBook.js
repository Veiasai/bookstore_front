import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {Link} from 'react-keeper';
import {Table, InputNumber, Button} from 'antd';

@inject(['rootStore'])
@observer
class ManageBook extends Component {
    constructor(props) {
        super(props);
        this.managerStore = this.props.rootStore.managerStore;
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
                render: (text, record) => (
                    <span>
                        <InputNumber min={1} defaultValue={record.bookPrice}
                                     onChange={(value) => {
                                         ;
                                     }}/>
                    </span>
                ),
            }, {
                title: 'Stock',
                dataIndex: 'bookStock',
                key: 'stock',
                render: (text, record) => (
                    <span>
                        <InputNumber min={0} max={999} defaultValue={record.bookStock}
                                     onChange={(value) => {
                                         ;
                                     }}/>
                    </span>
                ),
            }, {
                title: 'Delete',
                key: 'delete',
                render: (text, record) => (
                    <span><Button onClick={()=>{}} icon="minus-circle"/></span>
                ),
            }];

        return <Table columns={columns} dataSource={this.managerStore.bookData.toJS()}
                      loading={this.managerStore.bookloading}/>;
    }
}

export default ManageBook;