import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import React, {Component} from 'react';
import Booktable from './Booktable'
import Booksearch from './Booksearch'
import {observer, inject} from 'mobx-react'

const {Content, Footer, Sider} = Layout;

@inject(['rootStore'])
@observer
class Main extends Component {
    constructor(props) {
        super(props);
        this.bookStore = this.props.rootStore.bookStore;
    }

    selectClass = ()=>{
        let conditions = {
            priceRange: this.bookStore.priceRange,
            dateRange:this.bookStore.dateRange,
            bookClass: this.bookStore.bookClass
        };
        this.bookStore.searchbook(conditions);
    };

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
                            <Menu title={<span>Navigation One</span>} mode='inline'
                                  style={{height: '100%'}}
                                    onClick={({ item, key, keyPath }) => {
                                        if (key === '0')
                                        {
                                            this.bookStore.bookClass = null;
                                        }
                                        else {
                                            this.bookStore.bookClass = key;
                                        }
                                        this.selectClass();
                                    }}
                            >
                                <Menu.SubMenu key="sub" title={<span><Icon type="setting"/><span>图书分类</span></span>}>
                                    {
                                        this.bookStore.classCatalogue.map((Item, i) => {
                                            return (<Menu.Item key={i}>{Item}</Menu.Item>)
                                        })
                                    }
                                </Menu.SubMenu>
                            </Menu>
                        </Sider>

                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Booksearch manager={this.props.manager}/>
                            <Booktable manager={this.props.manager}/>
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

