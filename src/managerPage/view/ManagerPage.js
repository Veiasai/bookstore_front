import React, {Component} from 'react';
import {Col, Icon, Row, Tabs} from 'antd';
import ManageSale from './ManageSale'
import ManageSaleSearch from './ManageSaleSearch'
import ManageUser from './ManageUser'
import {view as BookFrame} from '../../booktable'

import {inject, observer} from "mobx-react/index";

const TabPane = Tabs.TabPane;

@inject(['rootStore'])
@observer
class Default extends Component {
    constructor(props) {
        super(props);
        this.managerStore = this.props.rootStore.managerStore;
    }

    render() {
        return (
            <Row className="App" type="flex" justify="space-around" align="middle">
                <Col span={24}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={<span><Icon type="android" />管理用户</span>} key="1">
                            <ManageUser/>
                        </TabPane>
                        <TabPane tab={<span><Icon type="apple" />销售统计</span>} key="2">
                            <ManageSaleSearch/>
                            <br/>
                            <ManageSale/>
                            <br/>
                            <h3>销售总量：{this.managerStore.getTotalCount}</h3>
                            <h3>物品总价：{this.managerStore.getTotalPrice}</h3>
                        </TabPane>
                        <TabPane tab={<span><Icon type="android" />管理书籍</span>} key="3">
                            <BookFrame manager={true}/>
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
        )
    }
}

export default Default;