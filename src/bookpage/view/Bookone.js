import React, {Component} from 'react';
import {Card, Row, Col, Input, Button, Icon,} from 'antd';
import {inject, observer} from "mobx-react/index";

class Bookone extends Component {
    constructor(props, ) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <Row type="flex" justify="space-around" align="middle">
                <Col>
                    <Card
                        hoverable
                        style={{width: 600}}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
                    >
                        <Card.Meta
                            title={this.props.match.params.id + this.props.match.params.name}
                            description="www.instagram.com"
                        />
                    </Card>
                </Col>
            </Row>

        )
    }
}

export default Bookone;