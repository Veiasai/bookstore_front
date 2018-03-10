import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Row} from 'antd';
import './App.css';
import {view as Home} from './home'
import {view as Topbar} from './topbar'

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Topbar/>
                    <Row className="App">
                        <Route exact path="/" component={Home} />
                    </Row>
                </div>
            </Router>
        );
    }
}

export default App;
