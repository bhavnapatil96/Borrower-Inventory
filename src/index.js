import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware,createStore} from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import promise from 'redux-promise';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';
import allReducers from './reducers/index'
import {composeWithDevTools} from 'redux-devtools-extension'
const store = createStore(allReducers,composeWithDevTools(applyMiddleware(promise,logger,thunk)));

ReactDOM.render(<Provider store={store}>
    <App/>
</Provider>, document.getElementById('root'));
registerServiceWorker();
