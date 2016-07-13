var redux = require('redux');
var createStore = redux.createStore;
var applyMiddleware = redux.applyMiddleware;
var thunk = require('redux-thunk').default;

var all = require('./reducers/combined');

var store = createStore(all.reducers, applyMiddleware(thunk));
module.exports  = store;
