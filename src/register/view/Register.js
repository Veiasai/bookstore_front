import React from 'react'
import {  Row, Col, Divider } from 'antd';
import Registerform from './Registerform'

class Register extends React.Component {
    render() {
        return (
        <div>
            <br/>
            <Divider />
            <Row type="flex" justify="space-around" align="middle">
                <Col span={6}>
                    <img src="https://raw.githubusercontent.com/Veiasai/pictures/master/register.jpg" alt="图片加载失败"/>
                </Col>
            </Row>
            <Divider />
            <Row type="flex" justify="space-around">
                <Col >
                    <Registerform />
                </Col>
            </Row>
        </div>
        )
    }
}

export default Register;