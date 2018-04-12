import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-keeper'
import {Row, Col, Layout, BackTop} from 'antd';
import './App.css';
import {view as Home} from './home'
import {view as Topbar} from './topbar'
import {view as Login} from './login'
import {view as Register} from './register'
import {view as Bookpage} from './bookpage'
import {view as ManagerPage} from './managerPage'
import {view as Default} from './missrouter'
import {view as Booktable} from './booktable'
import {view as Cart} from './shoppingcart'
import {view as Userzone} from './userzone'
import {view as Bookupload} from './bookupload'
import {view as Orderpage} from './orders'

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
                            <Route path="/>" component={Display}/>
                            <Route cache path="/login" component={Login}/>
                            <Route cache path="/register" component={Register}/>
                            <Route path="/myzone" component={Userzone}/>
                            <Route path="/cart" component={Cart}/>
                            <Route path="/manager" component={ManagerPage}/>
                            <Route path="/uploadbook" component={Bookupload}/>
                            <Route path="/book/:id" component={Bookpage}/>
                            <Route path="/order/:id" component={Orderpage}/>
                            <Route miss component={Default}/>
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
