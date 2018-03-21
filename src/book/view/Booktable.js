import React,{Component} from 'react';
import { Table, Input, Button, Icon } from 'antd';

import {observer} from 'mobx-react';
import {inject} from "mobx-react/index";

@inject(['rootStore'])
@observer
class Booktable extends Component {
    constructor(props, context)
    {
        super(props, context);
        const bookStore = this.props.rootStore.bookStore;
        this.state = {
            filterDropdownVisible: false,
            searchText: '',
            data:bookStore.data,
            filtered: false,
            pagination: {total:50},
            loading: false,
        };
    }

    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
    }

    onSearch = () => {
        const { searchText } = this.state;
        const {data} = this.props.rootStore.bookStore;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            data: data.map((record) => {
                const match = record.bookname.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    bookname: (
                        <span>
              {record.bookname.split(reg).map((text, i) => (
                  i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
                    ),
                };
            }).filter(record => !!record),
        });
    }
    render() {
        const columns = [
            {
            title: 'Name',
            dataIndex: 'bookname',
            key: 'name',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={ele => this.searchInput = ele}
                        placeholder="Search name"
                        value={this.state.searchText}
                        onChange={this.onInputChange}
                        onPressEnter={this.onSearch}
                    />
                    <Button type="primary" onClick={this.onSearch}>Search</Button>
                </div>
            ),
            filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
            filterDropdownVisible: this.state.filterDropdownVisible,
            onFilterDropdownVisibleChange: (visible) => {
                this.setState({
                    filterDropdownVisible: visible,
                }, () => this.searchInput && this.searchInput.focus());
            },
        },
            {
            title: 'Writer',
            dataIndex: 'writer',
            key: 'writer',
        }, {
            title: 'Class',
            dataIndex: 'class',
            key: 'class',
        }, {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        }, {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        }, {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        }];

        return <Table columns={columns} dataSource={this.state.data}
                      pagination={this.state.pagination}
                      loading={this.state.loading} />;
    }
}

export default Booktable;