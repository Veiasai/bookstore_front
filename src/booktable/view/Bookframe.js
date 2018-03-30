import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import React, {Component} from 'react';
import Booktable from './Booktable'
import {observer, inject} from 'mobx-react'

const {Content, Footer, Sider} = Layout;

@inject(['rootStore'])
@observer
class Main extends Component {
    getcata(cata) {
        let result = [];
        for (let item in cata) {
            result.push(item);
        }
        return result;
    }

    render() {
        const cata = this.props.rootStore.classStore.catalogue;
        return (
            <Layout>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                    </Breadcrumb>

                    <Layout style={{padding: '24px 0', background: '#fff'}}>
                        <Sider width={200} style={{background: '#fff'}}>
                            <Menu mode='inline' style={{height: '100%'}}>
                                {
                                    (this.getcata(cata)).map((Item, i) => {
                                        return (
                                            <Menu.SubMenu key={i} title={<span><Icon type="star"/>{Item}</span>}>
                                                {cata[Item].map((Item, j) => {
                                                    return (
                                                        <Menu.Item key={i * 20 + j}>{Item}</Menu.Item>
                                                    )
                                                })}
                                            </Menu.SubMenu>
                                        )
                                    })
                                }
                            </Menu>
                        </Sider>

                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Booktable/>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                </Footer>
            </Layout>
        )
    };
}

export default Main;

