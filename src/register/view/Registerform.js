import React from 'react'
import {Form, Input, Tooltip, Icon, Checkbox, Button,} from 'antd';
import {inject} from 'mobx-react'
import {prefix, ip, registerAction} from "../../constVariable";
import register from "../../registerServiceWorker";

const mobile = /^1\d{10}$/;
const password = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,18}$/;

@inject(['rootStore'])
class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.register(values);
            }

        });
    };

    register = async (values) => {
        const url = prefix + ip + registerAction;
        const request = {
            username: values.nickname,
            email: values.email,
            password: values.password,
        };

        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(request),
        });
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
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && !password.test(value)) {
            callback('password should include number and alpha(size:6-18)');
        }
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    compareMobileNumber = (rule, value, callback) => {
        if (value && mobile.test(value)) {
            callback();
        } else {
            callback('the input should be 11 digits');
        }
    }

    checkAgreement = (rule, value, callback) => {
        if (value === true) {
            callback();
        } else {
            callback('Here can\'t be false');
        }
    }

    render() {
        const FormItem = Form.Item;
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
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
                    {getFieldDecorator('nickname', {
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
                    <Button type="primary" htmlType="submit">Register</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm;