import React, {Component} from 'react';
import {Tabs} from 'antd';
import {inject, observer} from 'mobx-react';
import Userorders from './Userorders'
import UserInfo from './UserInfo'

const TabPane = Tabs.TabPane;

@inject(['rootStore'])
@observer
class Userzone extends Component {
    render() {
        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="My Info" key="1">
                    <UserInfo/>
                </TabPane>
                <TabPane tab="My Orders" key="2">
                    <Userorders/>
                </TabPane>
            </Tabs>
        );
    }
}

export default Userzone;