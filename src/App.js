import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {Row} from 'antd';
import './App.css';
import {view as Home} from './home'
import {view as Topbar} from './topbar'
import {view as Login} from './login'
import {view as Register} from './register'

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Topbar/>
                    <Row className="App">
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                    </Row>
                </div>
            </Router>
        );
    }
}

export default App;
