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
            const response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    mode: 'cors',
                    body: "bookid=" + bookID,
                });
            const json = await response.json();
            console.log(json);
            this.setState(json);
        }
        catch (err) {
            console.log(err);
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
        if (this.props.rootStore.cartStore.addBook(book) === 1) {
            message.info('购物车中已经有这本书');
        }
        else {
            message.info('添加至购物车成功');
        }
    };

    constructor(props,) {
        super(props);
        this.state = {
            bookID: this.props.params.id,
            bookName: this.props.params.name,
            bookPrice: 10,
            bookImg: "https://raw.githubusercontent.com/Veiasai/pictures/master/%E6%9A%97%E9%BB%91%E9%A6%86.jpg",
            bookClass: "loading",
            bookDescription: "loading",
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
                    <Col>
                        <Row>
                            <Card
                                hoverable
                                style={{width: 400}}
                                cover={<img alt="error"
                                            src={this.state.bookImg}/>}
                            >
                                <Card.Meta
                                    title={this.state.bookName}
                                    description={this.state.bookDate}
                                />
                            </Card>
                        </Row>
                        <Row>
                            <text>最大库存：{this.state.bookStock} 购买数量：{this.state.bookCount} 金额：{this.state.bookCount * this.state.bookPrice}</text>
                            <Slider min={1} max={this.state.bookStock} onChange={this.onChange}
                                    value={this.state.bookCount}/>
                        </Row>
                        <Row>
                            <Button style={{width: 400}} onClick={this.addBooktoCart}>加入购物车</Button>
                        </Row>
                    </Col>
                    <Col>
                        <Card title="Card title" bordered={false} style={{width: 400, height: 400}}>Card content</Card>
                    </Col>
                </Row>
            </Spin>
        )
    }
}

export default Bookone;