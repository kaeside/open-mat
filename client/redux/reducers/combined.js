var combineReducers = require('redux').combineReducers;

var allGyms = require('./gyms_reducer').gotGyms;
var nearby = require('./nearby_reducer').nearby;

var reducers = combineReducers({
  allGyms: allGyms,
  nearby: nearby
});

exports.reducers = reducers;
