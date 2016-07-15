
// action to save coords in central state from form submission
module.exports = {
  saveCoords: (coords) => {
    return {
      type: 'SAVE_COORDS',
      long: coords.longitude,
      lat: coords.latitude
    }
  }
}
