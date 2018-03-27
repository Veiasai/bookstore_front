import React, {Component} from 'react'
import { Form, Icon, Input, Button, Checkbox,Spin } from 'antd';
import {Link} from 'react-keeper'
import {inject} from 'mobx-react'
import './login.css'
import {message} from "antd/lib/index";
import {ip, prefix, loginAction} from "../../constVariable";


const FormItem = Form.Item;
@inject(['rootStore'])
class Loginform extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            loading: false,
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.login(values);
            }
        });
    };

    login = async (values) => {
        const url = prefix + ip + loginAction;
        this.setState({loading: true});
        try {
            const response = await fetch(url,
                {
                    method: "POST",
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    mode: 'cors',
                    body:  "password=" + values.password + "&email=" + values.email,
                });
            const json = await response.json();
            console.log(json);
            values.level = json.level;
            values.hasLogin = true;
            this.props.rootStore.userStore.record(json);
        }
        catch (err) {
            console.log(err);
            message.info('网络异常');
        }
        this.setState({loading: false});
    };

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
                    <Spin spinning={this.state.loading}>
                    <Button style={{width:'100%'}} type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    </Spin>
                    <br/>
                    Or <Link to="/register">register now!</Link>
                </FormItem>
            </Form>
        )
    }
}

const WrappedLogin = Form.create()(Loginform);
export default WrappedLogin;