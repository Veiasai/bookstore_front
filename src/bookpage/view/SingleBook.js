import React, {Component} from 'react';
import {Card, Row, Col, Button, Spin, Slider} from 'antd';
import {message} from "antd/lib/index";
import {getBookAction, ip, prefix} from "../../constVariable";
import {inject} from 'mobx-react';

@inject(['rootStore'])
class Bookone extends Component {
    getData = async (bookID) => {
        const url = prefix + ip + getBookAction;
        this.setState({loading: true});
        try {
            const response = await fetch(url + "/" + bookID,
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'charset=UTF-8'
                    },
                    mode: 'cors',
                });
            const json = await response.json();
            this.setState({...(json.bookImgAndDescrption), ...(json.singleBook)});
        }
        catch (err) {
            message.info('网络异常');
        }

        this.setState({loading: false});
    };

    onChange = (value) => {
        this.setState({
            bookCount: value,
        });
    };

    addBooktoCart = () => {
        let book = {
            bookSelect: false,
            bookID: {},
            bookName: {},
            bookPrice: {},
            bookWriter: {},
            bookDate: {},
            bookStock: 0,
            bookCount: 0,
            bookClass: {},
        };

        book = {...this.state};
        if (this.props.rootStore.userStore.user.hasLogin) {
            if (this.props.rootStore.cartStore.addBook(book) === 1) {
                message.info('购物车中已经有这本书');
            }
            else {
                message.info('添加至购物车成功');
            }
        }
        else {
            message.info('您还没有登录哦');
        }

    };

    updatebook = ()=>{

    };

    constructor(props,) {
        super(props);
        this.bookStore = this.props.rootStore.bookStore;
        this.userStore = this.props.rootStore.userStore;
        this.state = {
            bookID: this.props.params.id,
            bookName: this.props.params.name,
            bookPrice: 10,
            bookImg: "https://raw.githubusercontent.com/Veiasai/pictures/master/%E6%9A%97%E9%BB%91%E9%A6%86.jpg",
            bookClass: "loading",
            bookDescription: "图书不存在或网络异常",
            bookWriter: "loading",
            bookDate: "loading",
            bookStock: 10,
            bookCount: 1,
        };
    }

    componentWillMount() {
        this.getData(this.state.bookID);
    }

    render() {
        return (
            <Spin spinning={this.state.loading}>
                <Row type="flex" justify="center" align="top">
                    <Col span={8}>
                        <Row>
                            <Card
                                hoverable
                                style={{width: "100%"}}
                                cover={<img alt="error" style={{height: 550}}
                                            src={this.state.bookImg}/>}
                            >
                                <Card.Meta
                                    title={this.state.bookName}
                                    description={this.state.bookWriter}
                                />
                            </Card>
                        </Row>
                        <Row>
                            <text>库存：{this.state.bookStock} 价格：{this.state.bookPrice} 购买数量：{this.state.bookCount} 金额：{this.state.bookCount * this.state.bookPrice}</text>
                            <Slider min={1} max={this.state.bookStock} onChange={this.onChange}
                                    value={this.state.bookCount}/>
                        </Row>
                        <Row>
                            <Button style={{width: 400}} onClick={this.addBooktoCart}>加入购物车</Button>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Card title="简介" bordered={false}
                              style={{width: 400, height: 400}}>{this.state.bookDescription}</Card>
                    </Col>
                </Row>
            </Spin>
        )
    }
}

export default Bookone;