import React, {Component} from 'react';
import {Table, Input, Button, Icon} from 'antd';
import {observer} from 'mobx-react';
import {inject} from "mobx-react/index";
import moment from 'moment';

const Search = Input.Search;

@inject(['rootStore'])
@observer
class Booksearch extends Component {
    constructor(props) {
        super(props);
        this.classStore = this.props.rootStore.classStore;
        this.bookStore = this.props.rootStore.bookStore;
    }
    render() {
        return(
            <div>
                <Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    enterButton
                />
                <br /><br />
            </div>
        )
    }
}

export default Booksearch;