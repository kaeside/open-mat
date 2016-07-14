var combineReducers = require('redux').combineReducers;

var allGyms = require('./gyms_reducer').gotGyms;
var nearby = require('./nearby_reducer').nearby;
var general = require('./general_reducer');

var reducers = combineReducers({
  allGyms: allGyms,
  nearby: nearby,
  coords: general.coords
});

exports.reducers = reducers;
