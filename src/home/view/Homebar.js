import React, {Component} from 'react';
import {Row, Col,  Menu} from 'antd';
import {Link} from 'react-keeper'


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
                            <Menu.Item key="1"><Link to='/'>首页</Link></Menu.Item>
                            <Menu.Item key="2"><Link to='/like'>店长推荐</Link></Menu.Item>
                            <Menu.Item key="3"><Link to='/new'>新书上架</Link></Menu.Item>
                            <Menu.Item key="4"><Link to='/upload'>上传书籍</Link></Menu.Item>
                            <Menu.Item key="5">加盟我们</Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            </div>
        )
    };
}

export default Home;

