import React, {Component} from 'react';
import {BackTop, Row, Col, Layout, Menu} from 'antd';
import {Route, Link} from 'react-keeper'
import Main from './Main'
import Display from './BookDisplay'

const {Footer} = Layout;

class Home extends Component {
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
                <Row type="flex" justify="space-around" align="middle" style={{background: '#000000'}}>
                    <Col span={12}>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            style={{lineHeight: '64px'}}
                        >
                            <Menu.Item key="1"><Link to='/home'>首页</Link></Menu.Item>
                            <Menu.Item key="2"><Link to='/home/like'>店长推荐</Link></Menu.Item>
                            <Menu.Item key="3"><Link to='/home/new'>新书上架</Link></Menu.Item>
                            <Menu.Item key="4"><Link to='/home/upload'>上传书籍</Link></Menu.Item>
                            <Menu.Item key="5">加盟我们</Menu.Item>
                        </Menu>
                    </Col>
                </Row>

                <Row type="flex" justify="space-around" align="middle">
                    <Col span={16}>
                        <Route index component={Display}/>
                    </Col>
                </Row>
            </div>
        )
    };
}

export default Home;

