module.exports = {
  saveCoords: (coords) => {
    return {
      type: 'SAVE_COORDS',
      long: coords.longitude,
      lat: coords.latitude
    }
  }
}
