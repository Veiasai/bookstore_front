import React from 'react'
import {Form, Input, Tooltip, Icon, Checkbox, Button, Spin, message} from 'antd';
import {inject} from 'mobx-react'
import {prefix, ip, postBookAction} from "../../constVariable";

@inject(['rootStore'])
class BookInput extends React.Component {
    constructor(props, context) {
        super(...arguments);
        this.state = {
            loading: false,
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.submit(values);
            }
        });
    };

    submit = async (values) => {
        const url = prefix + ip + postBookAction;
        this.setState({loading: true});
        try {
            const response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include",
                    mode: 'cors',
                    body: {},
                });
            const json = await response.json();
            if (json.code === 200) {

            }
        }
        catch (err) {
            message.info('网络异常');
        }
        this.setState({loading: false});
    };

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
                    label="BookName"
                >
                    {getFieldDecorator('bookName', {
                        rules: [
                            {
                                required: true, message: 'Please input bookname!',
                            }],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="BookPrice"
                >
                    {getFieldDecorator('bookPrice', {
                        rules: [{
                            required: true, message: 'Please input price!',
                        }],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="BookDate"
                >
                    {getFieldDecorator('bookDate', {
                        rules: [{
                            required: true, message: 'Please input date!',
                        }],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="BookWriter"
                >
                    {getFieldDecorator('bookWriter', {
                        rules: [{
                            required: true, message: 'Please input writer!',
                        }],
                    })(
                        <Input/>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="BookClass"
                >
                    {getFieldDecorator('bookClass', {
                        rules: [{
                            required: true, message: 'Please input class!',
                        }],
                    })(
                        <Input/>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="BookDescription"
                >
                    {getFieldDecorator('bookDescription', {
                        rules: [{
                            required: true, message: 'Please input description!',
                        }],
                    })(
                        <Input/>
                    )}
                </FormItem>


                <FormItem {...tailFormItemLayout}>
                    <Spin spinning={this.state.loading}>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Spin>
                </FormItem>
            </Form>

        );
    }
}

const WrappedBookInputForm = Form.create()(BookInput);

export default WrappedBookInputForm;