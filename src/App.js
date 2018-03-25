import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-keeper'
import {Row,Col, Layout, BackTop} from 'antd';
import './App.css';
import {view as Home} from './home'
import {view as Topbar} from './topbar'
import {view as Login} from './login'
import {view as Register} from './register'
import {view as Bookpage} from './bookpage'
import {view as Welcome} from './welcome'
import Main from "./home/view/Main";

const {Content, Footer, Sider} = Layout;

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Topbar/>
                    <Row className="App">
                        <Route index path="/" component={Welcome} />
                        <Route cache path="/login" component={Login} />
                        <Route cache path="/register" component={Register} />
                        <Route path="/book/:id/:name" component={Bookpage} />
                        <Route path="/home" component={Home} />
                    </Row>

                    <Row type="flex" justify="space-around" align="middle">
                        <Col span={16}>
                            <Route cache path='/home>' component={Main}/>
                            <Route cache path='/home/:class' component={Main}/>
                        </Col>
                    </Row>

                    <Row type="flex" justify="space-around" align="middle">
                        <Col span={24}>
                            <Footer style={{textAlign: 'center', background: '#e9f8ff'}}>
                                Tornado Bookstore ©2018 Created by Veiasai
                            </Footer>
                        </Col>
                    </Row>
                    <BackTop/>
                </div>
            </Router>
        );
    }
}

export default App;
