import { Card, Icon, Button } from 'antd';
import React,{Component} from 'react';
import {Link} from 'react-router-dom'

class Singlebook extends Component {

    addclick = (e) => {
    }

    render() {
        const {width, imgsrc, bookname, description, height } = this.props;
        return (
            <Card
                cover={<img style={{ width: width, height: height}} alt="example" src={imgsrc} />}
                actions={[<Link to={'/book/'+ bookname}>详情</Link>, <Icon onClick={this.addclick} type="plus-circle-o" />]}
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