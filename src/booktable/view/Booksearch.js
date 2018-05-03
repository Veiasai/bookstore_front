import React, {Component} from 'react';
import {Table, Input, DatePicker, InputNumber, Icon, Row, Col} from 'antd';
import {observer} from 'mobx-react';
import {inject} from "mobx-react/index";
import moment from 'moment';

const {RangePicker} = DatePicker;
const Search = Input.Search;

@inject(['rootStore'])
@observer
class Booksearch extends Component {
    search = (value) => {
        let conditions = {
            searchText:value,
            priceRange: this.bookStore.priceRange,
            dateRange:this.bookStore.dateRange,
            bookClass: this.bookStore.bookClass,
        };
        this.bookStore.searchbook(conditions, this.props.manager);
    };

    constructor(props) {
        super(props);
        this.bookStore = this.props.rootStore.bookStore;
        this.state = {
            mode: ['month', 'month'],
            value: [],
        };
    }

    handlePanelChange = (value, mode) => {
        this.setState({
            value,
            mode: [
                mode[0] === 'date' ? 'month' : mode[0],
                mode[1] === 'date' ? 'month' : mode[1],
            ],
        });
        this.bookStore.dateRange = value;
    };

    render() {
        const { value, mode } = this.state;
        return (
            <div>
                <Search
                    placeholder="input search text"
                    onSearch={this.search}
                    enterButton
                />
                <br/><br/>
                <Row>
                    <Col span={12}>
                        <h4>Price Range:</h4>
                        <InputNumber size="small" min={1} max={999} defaultValue={this.bookStore.priceRange[0]}
                                     onChange={(e) => {
                                         this.bookStore.priceRange[0] = e;
                                     }}/>
                        <Icon type="swap"/>
                        <InputNumber size="small" min={1} max={999} defaultValue={this.bookStore.priceRange[1]}
                                     onChange={(e) => {
                                         this.bookStore.priceRange[1] = e;
                                     }}/>
                    </Col>
                    <Col span={12}>
                        <h4>Date Range:</h4>
                        <RangePicker
                            placeholder={['Start month', 'End month']}
                            format="YYYY-MM"
                            value={value}
                            mode={mode}
                            onPanelChange={this.handlePanelChange}
                        />
                    </Col>
                </Row>
                <br/><br/>
            </div>
        )
    }
}

export default Booksearch;