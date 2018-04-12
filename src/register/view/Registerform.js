import React from 'react'
import {Form, Input, Tooltip, Icon, Checkbox, Button, Spin, message} from 'antd';
import {inject} from 'mobx-react'
import {prefix, ip, registerAction} from "../../constVariable";
import {Control} from 'react-keeper'


const mobile = /^1\d{10}$/;
const password = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,18}$/;

@inject(['rootStore'])
class RegistrationForm extends React.Component {
    constructor(props, context) {
        super(...arguments);
        this.state = {
            confirmDirty: false,
            loading: false,
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.register(values);
            }
        });
    };

    register = async (values) => {
        const url = prefix + ip + registerAction;
        this.setState({loading: true});
        let user = {
            email:{},
            username:{},
            password:{}
        };
        user = {...values};
        try {
            const response = await fetch(url,
                {
                    method: "POST",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    credentials: "include",
                    mode: 'cors',
                    body: JSON.stringify(user),
                });
            const json = await response.json();
            if (json.code === 200)
            {
                user.hasLogin = true;
                this.props.rootStore.userStore.record(user);
                message.info('注册成功');
                Control.go('/', { name: 'React-Keeper' })
            }
        }
        catch (err) {
            message.info('网络异常');
        }

        this.setState({loading: false});
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && !password.test(value)) {
            callback('password should include number and alpha(size:6-18)');
        }
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    compareMobileNumber = (rule, value, callback) => {
        if (value && mobile.test(value)) {
            callback();
        } else {
            callback('the input should be 11 digits');
        }
    };

    checkAgreement = (rule, value, callback) => {
        if (value === true) {
            callback();
        } else {
            callback('Here can\'t be false');
        }
    };

    render() {
        const FormItem = Form.Item;
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 12},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="E-mail"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Password"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password"/>
                    )}
                </FormItem>

                <FormItem{...formItemLayout} label="Confirm Password">
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur}/>
                    )}
                </FormItem>

                <FormItem{...formItemLayout} label={(
                    <span>Nickname&nbsp;
                        <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o"/></Tooltip></span>)}>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: 'Please input your nickname!', whitespace: true}],
                    })(
                        <Input/>
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label="Mobile Phone">
                    {getFieldDecorator('Mobile Phone', {
                        rules: [{
                            required: true, message: 'Please input your Mobile Phone Number',
                        }, {
                            validator: this.compareMobileNumber,
                        },
                        ],
                    })(
                        <Input/>
                    )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                        rules: [{
                            validator: this.checkAgreement,
                        },
                        ],
                    })(
                        <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Spin spinning={this.state.loading}>
                        <Button type="primary" htmlType="submit">Register</Button>
                    </Spin>
                </FormItem>
            </Form>

        );
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm;