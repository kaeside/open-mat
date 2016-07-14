const update = require('react-addons-update');

function nearbyReducer(state = null, action) {
  let newState = null;
  if (action.type === "NEARBY_GYMS_FOUND") {
    newState = update(state, {
      $set: action.gyms
    })
  }
  else if (action.type === "NEARBY_ERROR") {
    console.log(action.err);
  }
  return newState || state
}

module.exports = {
  nearby: nearbyReducer
}
