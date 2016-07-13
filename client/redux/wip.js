var gymActions = require('./actions/gym_actions');
var nearActions = require('./actions/nearby_actions');
var store = require('./store');

var mock_location_near = {
  longitude: -122.0562350,
  latitude: 37.9697890,
  distance: 50
}

var mock_location_far = {
  latitude: 53.754531775543754,
  longitude: -1.6288170391518726
}

// store.dispatch(gymActions.getAllGyms());
store.dispatch(nearActions.getNearbyGyms(mock_location_far));
