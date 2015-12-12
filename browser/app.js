import 'babel-polyfill';
import io from 'socket.io-client';
import seedrandom  from 'seedrandom';

import React from 'react';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import * as ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

window.global = window;
window._ = require('lodash');
window.storage = sessionStorage;
window.g = {};

var socket = io();
g.socket = socket;
g.rand = seedrandom('bean&owl');
g.path = __dirname;


socket.on('connect', function(){
  console.log('connected to server');

  console.log('browser says: hi');
  socket.emit('test', 'hi', function(msg){
    console.log('server says:', msg);
  });
});

var log = console.log.bind(console);




import ReactApp from './react/main.js';
import initState from './initState.js';
import reducer from './redux/reducer.js';

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  loggerMiddleware // neat middleware that logs actions
)(createStore);

let store = createStoreWithMiddleware(reducer, initState);

var select = function(state) {
  return state;
};

var App = connect(select)(ReactApp);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
);
