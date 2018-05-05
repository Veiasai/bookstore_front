import React, {Component} from 'react';
import {Col, Row} from 'antd';
import {inject} from 'mobx-react';
import BookInput from './BookInput'
import BookImgUpload from './BookImgUpload'

@inject(['rootStore'])
class BookUpload extends Component {
    render() {
        return (
            <div>
                {this.props.manager ? null : <Row type="flex" justify="space-around" >
                    <h2>填写图书信息，等待管理员审核。</h2>
                </Row>}
            <Row type="flex" justify="space-around">
                <Col span={12}>
                    <BookInput manager={this.props.manager}/>
                </Col>
                <Col span={8}>
                    <BookImgUpload manager={this.props.manager}/>
                    <text>图书图片</text>
                </Col>
            </Row>
            </div>
        )
    }
}

export default BookUpload;