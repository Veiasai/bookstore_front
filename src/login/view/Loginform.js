import React, {Component} from 'react'
import {Form, Icon, Input, Button, Checkbox, Spin} from 'antd';
import {Control, Link} from 'react-keeper'
import {inject} from 'mobx-react'
import './login.css'
import {message} from "antd/lib/index";
import {ip, prefix, loginAction} from "../../constVariable";


const FormItem = Form.Item;

@inject(['rootStore'])
class Loginform extends Component {
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
        if (values !== null)
            this.setState({loading: true});
        let user = {
            email: {},
            password: {}
        };
        user = {...values};

        try {
            const response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include",
                    mode: 'cors',
                    body: JSON.stringify(user),
                });

            const json = await response.json();
            if (json.code === 200) {
                user.hasLogin = true;
                user.username = json.user.username;
                this.props.rootStore.userStore.record(user);
                message.info('登录成功');
                this.setState({loading: false});
                Control.go('/', {name: 'React-Keeper'})
            }
            else {
                if (values !== null)
                    message.info(json.message);
            }
        }
        catch (err) {
            if (values !== null)
                message.info('网络异常');
        }
        this.setState({loading: false});
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    componentWillMount() {
        this.login(null);
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {required: true, message: 'Please input your Email!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Email"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="Password"/>
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
                        <Button style={{width: '100%'}} type="primary" htmlType="submit" className="login-form-button">
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