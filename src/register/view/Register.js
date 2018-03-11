import React from 'react'
import { Form, Select, Row, Col, AutoComplete, Divider } from 'antd';
import Registerform from './Registerform'

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

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
                <Col span={6}>
                    <Registerform />
                </Col>
            </Row>
        </div>
        )
    }
}

export default Register;