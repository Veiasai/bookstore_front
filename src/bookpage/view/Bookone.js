import React, {Component} from 'react';
import {Card, Row, Col, Input, Button, Icon,} from 'antd';


class Bookone extends Component {
    constructor(props, ) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <Row type="flex" justify="center" align="top">
                <Col>
                    <Card
                        hoverable
                        style={{width: 400}}
                        cover={<img alt="example" src="https://raw.githubusercontent.com/Veiasai/pictures/master/%E6%9A%97%E9%BB%91%E9%A6%86.jpg"/>}
                    >
                        <Card.Meta
                            title={this.props.params.id + this.props.params.name}
                            description="www.instagram.com"
                        />
                    </Card>
                </Col>
                <Col>
                    <Card title="Card title" bordered={false} style={{width: 400, height:400}}>Card content</Card>
                    <Button>加入购物车</Button>
                </Col>
            </Row>

        )
    }
}

export default Bookone;