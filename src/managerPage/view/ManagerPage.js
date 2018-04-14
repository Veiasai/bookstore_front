import React, {Component} from 'react';
import {Row, Col, Tabs, Icon} from 'antd';
import ManageSale from './ManageSale'
import ManageUser from './ManageUser'

const TabPane = Tabs.TabPane;
class Default extends Component {
    render() {
        return (
            <Row className="App" type="flex" justify="space-around" align="middle">
                <Col span={24}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={<span><Icon type="android" />管理用户</span>} key="1">
                            <ManageUser/>
                        </TabPane>
                        <TabPane tab={<span><Icon type="apple" />管理书籍</span>} key="2">
                            <ManageSale/>
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
        )
    }
}

export default Default;