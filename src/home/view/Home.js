import React,{Component} from 'react';
import { BackTop, Row, Col, Layout, Menu} from 'antd';
import Main from './Main'
import Display from './BookDisplay'

const {Footer, Header} = Layout;
class Home extends Component{
    render() {
        return (
            <div>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={24}>
                        <div className="storename">
                            <h3>龙卷风书店</h3>
                        </div>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={24}>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={18}>
                        <Display/>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={18}>
                        <Main/>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={18}>
                        <Footer style={{ textAlign: 'center' }}>
                            Ant Design ©2016 Created by Ant UED
                        </Footer>
                    </Col>
                </Row>
                <BackTop />
            </div>
            )
    };
}

export default Home;

