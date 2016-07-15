import update from 'react-addons-update';

function savePosition(state = {}, action) {
  let newState = null;
  switch (action.type) {
    case 'SAVE_COORDS':
      newState = update(state, {
        $set: {
          long: action.long,
          lat: action.lat
        }
      })
      break;
    default:
      // console.log("Not Found");
  }
  return newState || state;
}

module.exports = {
  coords: savePosition
}
