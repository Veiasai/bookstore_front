import React, {Component} from 'react';
import {Card, Row, Col, Button, Spin, Slider} from 'antd';
import {inject} from 'mobx-react';
import BookInput from './BookInput'
import BookImgUpload from './BookImgUpload'

@inject(['rootStore'])
class BookUpload extends Component {
    render() {
        return (
            <Row type="flex" justify="space-around">
                <Col span={6}>
                    <BookInput/>
                </Col>
                <Col span={6}>
                    <BookImgUpload/>
                    <text>图书图片</text>
                </Col>
            </Row>
        )
    }
}

export default BookUpload;