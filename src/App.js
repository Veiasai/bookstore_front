import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-keeper'
import {Row} from 'antd';
import './App.css';
import {view as Home} from './home'
import {view as Topbar} from './topbar'
import {view as Login} from './login'
import {view as Register} from './register'
import {view as Bookpage} from './bookpage'

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Topbar/>
                    <Row className="App">
                        <Route cache path="/login" component={Login} />
                        <Route cache path="/register" component={Register} />
                        <Route path="/book/:id/:name" component={Bookpage} />
                        <Route path="/home" component={Home} />
                    </Row>
                </div>
            </Router>
        );
    }
}

export default App;
