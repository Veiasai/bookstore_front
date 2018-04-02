import React, {Component} from 'react';
import {Card} from 'antd';

class Default extends Component {
    render() {
        return (
            <div>
                <Card loading title="访问的页面找不到哦" style={{width: '100%'}}>
                </Card>
            </div>
        )
    }
}

export default Default;