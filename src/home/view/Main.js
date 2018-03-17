import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import React,{Component} from 'react';
import {view as Bookgrid} from '../../book'

const { Content, Footer, Sider } = Layout;

const catalogue = {
    '青春':[
        '校园',
        '爱情',
        '叛逆',
        '悬疑',
        '惊悚',
        '网络',
        '爆笑',
    ],
    '小说':[
        '世界名著',
        '外国小说',
        '中国古典小说',
        '中国现代小说',
        '中国当代小说',
        '历史小说',
        '都市小说',
        '悬疑推理',
        '恐怖惊悚',
        '武侠小说',
        '言情',
    ],
}

class Main extends Component{
    getcata(cata){
        let result = [];
        for (let prop in cata) {
            result.push(prop);
        }
        return result;
    }
    render() {
        return ( <Layout>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                </Breadcrumb>

                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu mode='inline' style={{ height: '100%' }}>
                            {
                                (this.getcata(catalogue)).map((Item, i)=> {
                                    return (
                                        <Menu.SubMenu key={i} title={<span><Icon type="star" />{Item}</span>}>
                                            {catalogue[Item].map((Item, j)=> {
                                                return (
                                                    <Menu.Item key={i*20+j}>{Item}</Menu.Item>
                                                )
                                            })}
                                        </Menu.SubMenu>
                                    )
                                })
                            }
                        </Menu>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Bookgrid />
                    </Content>
                </Layout>
            </Content>
                <Footer style={{ textAlign: 'center'}}>
                </Footer>
        </Layout>
        )
    };
}

export default Main;

