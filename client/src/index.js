import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk'
import './index.css'
import reducers from './reducers'

const store = createStore(reducers, compose(applyMiddleware(thunk)))

console.log(store)
ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>
  , document.getElementById('root'));
