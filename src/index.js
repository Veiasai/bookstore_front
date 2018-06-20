import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'mobx-react'
import rootStore from './rootstore'

ReactDOM.render(<Provider rootStore={rootStore}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
