import { Card, Icon } from 'antd';
import React,{Component} from 'react';

class Singlebook extends Component {
    render() {
        const {width, imgsrc, bookname, description, height } = this.props;
        return (
            <Card
                cover={<img style={{ width: width, height: height}} alt="example" src={imgsrc} />}
                actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
            >
                <Card.Meta
                    title={bookname}
                    description={description}
                />
            </Card>
        )
    }
}

export default Singlebook;