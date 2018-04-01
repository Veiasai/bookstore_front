import React, {Component} from 'react';
import {Icon, Upload, Modal, Card, Tabs, Tooltip} from 'antd';
import {inject, observer} from 'mobx-react';
import UploadIcon from "./UploadIcon";

const TabPane = Tabs.TabPane;
const {Meta} = Card;

@inject(['rootStore'])
@observer
class Userzone extends Component {
    render() {
        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="Avator" key="1">
                    <Card
                        hoverable
                        style={{width: 240}}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
                    >
                        <Meta
                            title="个人头像"
                            description="i am veia"
                        />
                    </Card>
                </TabPane>

                <TabPane tab="My Favorite Books" key="2">
                    <UploadIcon/>
                </TabPane>
                <TabPane tab="My Orders" key="3">

                </TabPane>
            </Tabs>
        );
    }
}

export default Userzone;