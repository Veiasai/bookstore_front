import React, {Component} from 'react';
import {Button, Col, Icon, Row, Spin, Upload} from 'antd';
import {message} from "antd/lib/index";
import {inject, observer} from 'mobx-react';
import {ip, prefix, uploadbookimg} from "../../constVariable";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}


@inject(['rootStore'])
@observer
class UserInfo extends Component {
    handleChange1 = (info) => {
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                this.userInfoStore.postData(imageUrl, "Avatar")
            });
        }
    };

    handleChange2 = (info) => {
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => {
                this.userInfoStore.postData(imageUrl, "Cover")
            });
        }
    };

    constructor(props) {
        super(props);
        this.userInfoStore = this.props.rootStore.userInfoStore;
        this.userInfoStore.getData();
    }

    render() {
        return (
            <Spin spinning={this.userInfoStore.loading}>
                <Row>
                    <Col span={12}>
                        <img style={{width: 300, height: 300}} src={this.userInfoStore.avatar} alt="网络异常或未上传"/>
                    </Col>
                    <Col span={12}>
                        <img style={{width: 300, height: 300}} src={this.userInfoStore.favoriteBook} alt="网络异常或未上传"/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={12}>
                        <Upload
                            name="avatar"
                            action={prefix + ip + uploadbookimg}
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange1}
                        >
                            <Button>
                                <Icon type="upload"/> Click to Upload Avatar
                            </Button>
                        </Upload>
                    </Col>
                    <Col span={12}>
                        <Upload
                            name="book"
                            action={prefix + ip + uploadbookimg}
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange2}
                        >
                            <Button>
                                <Icon type="upload"/> Click to Upload Book Cover
                            </Button>
                        </Upload>
                    </Col>
                </Row>
            </Spin>
        );
    }
}

export default UserInfo;