import React, {Component} from 'react'
import { Row, Col , Divider} from 'antd';
import Loginform from './Loginform'

class Login extends Component {
    render() {
        return (
            <div>
                <br/>
                <Divider />
            <Row type="flex" justify="space-around" align="middle">
                <Col span={6}>
                    <img src="https://raw.githubusercontent.com/Veiasai/pictures/master/login.jpg" alt="图片加载失败"/>
                </Col>
            </Row>
                <Divider />
            <Row type="flex" justify="space-around">
                <Col span={6}>
                    <Loginform/>
                </Col>
            </Row>
            </div>
        )
    }
}

export default Login;