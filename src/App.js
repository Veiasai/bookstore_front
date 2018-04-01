import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-keeper'
import {Row, Col, Layout, BackTop} from 'antd';
import './App.css';
import {view as Home} from './home'
import {view as Topbar} from './topbar'
import {view as Login} from './login'
import {view as Register} from './register'
import {view as Bookpage} from './bookpage'
import {view as Welcome} from './welcome'
import {view as Default} from './missrouter'
import {view as Booktable} from './booktable'
import {view as Cart} from './shoppingcart'
import {view as Userzone} from './userzone'
import {view as Bookupload} from './bookupload'
import Display from './BookDisplay'

const {Footer} = Layout;

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Topbar/>
                    <Home/>
                    <Row className="App" type="flex" justify="space-around" align="middle">
                        <Col span={16}>
                            <Route index path="/>" component={Welcome}/>
                            <Route cache path="/login" component={Login}/>
                            <Route cache path="/register" component={Register}/>
                            <Route path="/myzone" component={Userzone}/>
                            <Route path="/cart" component={Cart}/>
                            <Route path="/uploadbook" component={Bookupload}/>
                            <Route path="/book/:id/:name?" component={Bookpage}/>
                            <Route miss component={Default}/>
                        </Col>
                    </Row>
                    <Row type="flex" justify="space-around" align="middle">
                        <Col span={16}>
                            <Route path="/>" component={Display}/>
                        </Col>
                    </Row>

                    <Row type="flex" justify="space-around" align="middle">
                        <Col span={16}>
                            <Route cache path='/>' component={Booktable}/>
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
