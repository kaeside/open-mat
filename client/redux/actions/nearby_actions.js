require('isomorphic-fetch');

module.exports = {
  getNearbyGyms: (location) => {
    // So apparently this is how you turn an object into params using fetch...
    var params = Object.keys(location)
                       .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(location[key]))
                       .join('&')
                       .replace(/%20/g, "+");
    return (dispatch) => {
      return fetch('/api/nearby/?' + params).then(result => {
        if (result.status < 200 || result.status >= 300) {
          var err = new Error(result.statusText);
          err.response = result;
          throw err;
        }
        return result;
      }).then(data => {
        return data.json();
      }).then(gyms => {
        return dispatch({
          type: "NEARBY_GYMS_FOUND",
          gyms: gyms
        })
      }).catch(err => {
        return dispatch({
          type: "NEARBY_ERROR",
          err: err
        })
      })
    }
  }
}
