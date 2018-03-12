import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/reducer';
import { CookiesProvider } from 'react-cookie';


const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(<BrowserRouter><Provider store={store}><CookiesProvider><App /></CookiesProvider></Provider></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
