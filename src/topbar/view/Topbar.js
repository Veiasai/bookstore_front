import { Affix , Row , Col, Button, Divider} from 'antd';
import React,{Component} from 'react';
import { Link } from "react-router-dom";

class Topbar extends Component {
    render() {
        return (
            <Affix >
                <Row className="Topbar" type="flex"  align="middle" style={{background:'#000044'}}>
                    <Col span={4} push={4}>
                        <Link to="/signin">登陆</Link>
                        <Divider type="vertical" />
                        <Link to="/signup">注册</Link>
                    </Col>
                    <Col span={6} push={10}>
                        <Link to="/myzone">个人信息</Link>
                        <Divider type="vertical" />
                        <Link to="/shoppingcart">我的购物车</Link>
                    </Col>
                </Row>
            </Affix>
        )
    }
}

export default  Topbar;