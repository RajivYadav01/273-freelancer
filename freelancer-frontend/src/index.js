import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/reducer';
import ReduxPromise from 'redux-promise';
import { CookiesProvider } from 'react-cookie';


const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const reduxStore = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(<BrowserRouter><Provider store={reduxStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}><CookiesProvider><App /></CookiesProvider></Provider></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
