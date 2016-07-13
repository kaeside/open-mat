var fetch = require('isomorphic-fetch');

module.exports = {
  getAllGyms: () => {
    return (dispatch) => {
      return fetch('http://localhost:8000/api/gyms').then(result => {
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
}
