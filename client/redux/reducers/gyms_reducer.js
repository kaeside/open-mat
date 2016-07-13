const update = require('react-addons-update');

function gotGyms(state = [], action) {
  let newState = null;
  if (action.type === 'ALL_GYMS_FOUND') {
    newState = update(state, {
      $set: action.gyms
    })
  }
  else if (action.type === 'GYMS_ERROR') {
    console.log(action.err);
  }
  return newState || state
}

module.exports = {
  gotGyms: gotGyms
}
