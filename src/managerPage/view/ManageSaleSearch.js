import React, {Component} from 'react'
import {Form, Row, Col, Input, Button, Icon, DatePicker, Radio} from 'antd';
import {inject, observer} from "mobx-react/index";

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@inject(['rootStore'])
@observer
class ManageSaleSearch extends Component {
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
            this.managerStore.getSaleRecord(values);
        });
    };
    handleReset = () => {
        this.props.form.resetFields();
    };

    constructor(props) {
        super(props);
        this.bookStore = this.props.rootStore.bookStore;
        this.managerStore = this.props.rootStore.managerStore;
    }

    render() {
        const rangeConfig = {
            rules: [{type: 'array', message: 'Please select time!'}],
        };

        const {getFieldDecorator} = this.props.form;
        return (
            <Form
                onSubmit={this.handleSearch}
            >
                <Row gutter={24}>
                    <Col span={6}>
                        <FormItem label={`bookID:`}>
                            {getFieldDecorator('bookID')
                            (
                                <Input/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label={`bookWriter:`}>
                            {getFieldDecorator('bookWriter')
                            (
                                <Input/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem
                            label="RangePicker"
                        >
                            {getFieldDecorator('dateRange', rangeConfig)(
                                <RangePicker/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label={`userID:`}>
                            {getFieldDecorator('userID')
                            (
                                <Input/>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <FormItem
                        label="BookClass"
                    >
                        {getFieldDecorator('bookClass')(
                            <RadioGroup>
                                {this.bookStore.classCatalogue.map((item, i) => {
                                    if (i !== 0)
                                        return <RadioButton value={i} key={i}>{item}</RadioButton>
                                })}
                            </RadioGroup>
                        )}
                    </FormItem>
                </Row>

                <Row>
                    <Col span={24} style={{textAlign: 'right'}}>
                        <Button type="primary" htmlType="submit">Search</Button>
                        <Button style={{marginLeft: 8}} onClick={this.handleReset}>
                            Clear
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

const ManageSaleSearchFrom = Form.create()(ManageSaleSearch);

export default ManageSaleSearchFrom;