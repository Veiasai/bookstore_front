import React from 'react'
import {Form, Input, Tooltip, Icon, Checkbox, Button, Spin, message, DatePicker, Radio} from 'antd';
import {inject} from 'mobx-react'
import {prefix, ip, postBookAction} from "../../constVariable";

const MonthPicker = DatePicker.MonthPicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const {TextArea} = Input;

const IntegerReg = /^[0-9]+$/;

const config = {
    rules: [{type: 'object', required: true, message: 'Please select time!'}],
};

@inject(['rootStore'])
class BookInput extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let img = this.props.rootStore.bookStore.uploadBookImg;
                if (img) {
                    this.submit(values, img);
                }
                else
                    message.info("图片不能为空");
            }
            console.log(values.bookClass);
        });
    };
    validatorInteger = (rule, value, callback) => {
        if (value && IntegerReg.test(value)) {
            callback();
        } else {
            callback('The input must be Integer');
        }
    };
    submit = async (values, img) => {
        const url = prefix + ip + postBookAction;
        this.setState({loading: true});
        try {
            let singleBook = {
                bookName: {},
                bookWriter: {},
                bookClass: {},
                bookDate: {},
                bookPrice: {},
            };
            singleBook = {...values};
            let bookImgAndDescrption = {
                bookImg: img,
                bookDescription: values.bookDescription,
            };

            let obj = {
                singleBook: singleBook,
                bookImgAndDescrption: bookImgAndDescrption,
            };

            const response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    body: JSON.stringify(obj),
                });

            const json = await response.json();
            if (json.code === 200) {
                message.info("上传成功");
            }
        }
        catch (err) {
            message.info('网络异常');
        }
        this.setState({loading: false});
    };

    constructor(props, context) {
        super(...arguments);
        this.bookStore = this.props.rootStore.bookStore;
        this.userStore = this.props.rootStore.userStore;
        this.state = {
            loading: false,
        };
    }

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
                {}
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
                            validator: this.validatorInteger,
                        }, {
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
                    {getFieldDecorator('bookDate', config)
                    (
                        <MonthPicker/>
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
                        <RadioGroup>
                            {this.bookStore.classCatalogue.map((item, i) => {
                                if (i !== 0)
                                    return <RadioButton value={i} key={i}>{item}</RadioButton>
                            })}
                        </RadioGroup>
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
                        <TextArea rows={4}/>
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