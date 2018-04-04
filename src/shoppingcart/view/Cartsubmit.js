import React, {Component} from 'react';
import {Button, Affix, Row, Col} from 'antd';
import {inject, observer} from 'mobx-react';


@inject(['rootStore'])
@observer
class Cartsubmit extends Component {
    constructor(props) {
        super(props);
        this.cartStore = this.props.rootStore.cartStore;
    }

    deleteSelection = ()=> {
        this.cartStore.deleteSelection();
    };

    render() {
        return (
            <Affix offsetBottom={0} style={{background: "#e0dfe3", height: 65}}>
                <Row type="flex" align="middle" >
                    <Col span={8} push={4}>
                        <a onClick={this.deleteSelection} style={{color:"#000000"}}>删除所选</a>
                    </Col>
                    <Col span={4} push={6}>
                        <h3>购物车总价：{this.cartStore.getAccount}</h3>
                        <h3>已选择物品总价：{this.cartStore.getSelectAccount}</h3>
                    </Col>
                    <Col span={4} push={6}>
                        <Button size="large" style={{background: "#788584", color:"#ffffff", height: 65, width:100}}>结算</Button>
                    </Col>
                </Row>
            </Affix>
        )
    }
}

export default Cartsubmit;
