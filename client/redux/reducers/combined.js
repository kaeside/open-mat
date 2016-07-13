var combineReducers = require('redux').combineReducers;

var local = require('./local_reducer').updates;

var reducers = combineReducers({
local: local
});

exports.reducers = reducers;
