import React,{Component} from 'react';
import { BackTop, Row, Col, Layout, Menu} from 'antd';
import Main from './Main'
import Display from './BookDisplay'

const {Footer} = Layout;
class Home extends Component{
    constructor(props)
    {
        super(props);
    }
    componentWillMount() {

    }
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
                <Row type="flex" justify="space-around" align="middle" style={{background:'#000000'}}>
                    <Col span={12}>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            style={{ lineHeight: '64px'}}
                        >
                            <Menu.Item key="1">首页</Menu.Item>
                            <Menu.Item key="2">店长推荐</Menu.Item>
                            <Menu.Item key="3">新书上架</Menu.Item>
                            <Menu.Item key="4">上传书籍</Menu.Item>
                            <Menu.Item key="5">加盟我们</Menu.Item>
                        </Menu>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={16}>
                        <Display/>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={16}>
                        <Main/>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={24}>
                        <Footer style={{ textAlign: 'center', background:'#fff' }}>
                            Tornado Bookstore ©2018 Created by Veiasai
                        </Footer>
                    </Col>
                </Row>
                <BackTop />
            </div>
            )
    };
}

export default Home;

