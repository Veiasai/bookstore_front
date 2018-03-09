import React, { Component } from 'react';
import './App.css';
import {Button}from 'antd'
import {view as Home} from './home'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Home />
            </div>
        );
    }
}

export default App;
