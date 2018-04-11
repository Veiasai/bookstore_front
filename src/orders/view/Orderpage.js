import React, {Component} from 'react';
import {message} from "antd/lib/index";
import {Card, Divider, Spin, List} from 'antd';
import {getOrderAction, ip, prefix} from "../../constVariable";
import {Control} from "react-keeper";
import moment from 'moment'

class Orderpage extends Component {
    constructor(props,) {
        super(props);
        this.state = {
            order:{},
            loading: true
        };
        this.orderGet(this.props.params.id);
    }

    orderGet = async (id) => {
        const url = prefix + ip + getOrderAction;
        try {
            const response = await fetch(url + "/" + id,
                {
                    method: "GET",
                    credentials: "include",
                    mode: 'cors',
                });
            const json = await response.json();
            if (json.code === 403) {
                message.info('登录失效');
                this.rootStore.userStore.user.hasLogin = false;
                Control.go('/', {name: 'React-Keeper'})
            }
            else if (json.code === 200) {
                if (json.order) {
                    this.setState({order: json.order, loading:false});
                }
            }
        }
        catch (err) {
            message.info('网络异常,订单加载失败');
        }
    };

    render() {
        return (
            <Spin spinning={this.state.loading}>
                <h1>订单详情</h1>
                <Card title={"id:" + this.props.params.id} style={{ width: "100%" }}>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.order.books}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={item.bookName + "  " + item.bookWriter}
                                    description={"bookID:" + item.bookID + "  Price:" + item.bookPrice
                                    +  "  bookCount:" + item.bookCount +  "  booktotalPrice:" + item.bookTotalPrice
                                    + "  Date:" + moment(item.bookDate).format("YYYY-MM")
                                    }
                                />
                            </List.Item>
                        )}
                    />
                    <Divider />
                    <h3>{"TotalPrice:" + this.state.order.totalPrice}</h3>
                    <h4>{"Date:" + this.state.order.date}</h4>
                </Card>
            </Spin>
        )

    }
}

export default Orderpage;