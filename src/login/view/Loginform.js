import React, {Component} from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {Link} from 'react-keeper'
import {inject} from 'mobx-react'
import './login.css'


const FormItem = Form.Item;
@inject(['rootStore'])
class Loginform extends Component {
    constructor(props)
    {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.rootStore.userStore.record(values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('Email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, { required: true, message: 'Please input your Email!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <Link className="login-form-forgot" to="/forgotpw">Forgot password</Link>
                    <br/>
                    <Button style={{width:'100%'}} type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    <br/>
                    Or <Link to="/register">register now!</Link>
                </FormItem>
            </Form>
        )
    }
}

const WrappedLogin = Form.create()(Loginform);
export default WrappedLogin;