import React, {Component} from 'react';
import {Icon, Upload, Modal} from 'antd';
import {message} from "antd/lib/index";
import {getUserInfoAction, ip, prefix} from "../../constVariable";
import {inject, observer} from 'mobx-react';

@inject(['rootStore'])
@observer
class UploadIcon extends Component {
    getData = async () => {
        const url = prefix + ip + getUserInfoAction;
        this.setState({loading: true});
        try {
            const response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    mode: 'cors',
                    body: {},
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

    userStore = this.props.rootStore.userStore;

    state = {
        previewVisible: false,
        previewImage: '',
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    handleChange = ({ fileList }) => {
        this.userStore.setUserIcon(fileList);
    };

    render() {
        const { previewVisible, previewImage } = this.state;
        const fileList = this.userStore.userInfo.userIcon;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action="//jsonplaceholder.typicode.com/posts/"
                    listType="picture-card"
                    fileList={fileList.toJS()}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 5 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

export default UploadIcon;