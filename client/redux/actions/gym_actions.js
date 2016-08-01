var fetch = require('isomorphic-fetch');

// making use of your getGyms endpoint...just for fun really. 😄
// but could be padded out for posting of new gyms.

module.exports = {
  getAllGyms: () => {
    return (dispatch) => {
      return fetch('/api/gyms').then(result => {
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
          type: 'ALL_GYMS_FOUND',
          gyms: gyms
        })
      }).catch(err => {
        return dispatch({
          type: 'GYMS_ERROR',
          err: err
        })
      })
    }
  }
  // postNewGym: () => {}
}
