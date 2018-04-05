import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import React, {Component} from 'react';
import Booktable from './Booktable'
import {observer, inject} from 'mobx-react'

const {Content, Footer, Sider} = Layout;

@inject(['rootStore'])
@observer
class Main extends Component {
    constructor(props){
        super(props);
        this.classStore = this.props.rootStore.classStore;
    }
    render() {

        return (
            <Layout>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                    </Breadcrumb>

                    <Layout style={{padding: '24px 0', background: '#fff'}}>
                        <Sider width={200} style={{background: '#fff'}}>

                            <Menu title={<span>Navigation One</span>} mode='inline' style={{height: '100%'}}>
                                <Menu.SubMenu key="sub" title={<span><Icon type="setting" /><span>图书分类</span></span>}>
                                    {
                                        this.classStore.catalogue.map((Item, i) => {
                                            return (<Menu.Item key={i}>{Item}</Menu.Item>)
                                        })
                                    }
                                </Menu.SubMenu>
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

