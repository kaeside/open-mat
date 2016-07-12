var Gym = require('../models/gym');

// finds all gyms within specified distance based on geocoordinates
exports.findNearbyGyms = function(req, res, next) {
    var limit = req.query.limit || 10;

    // get the max distance or set it to 8 kilometers
    var maxDistance = req.query.distance || 800;

    // we need to convert the distance to radians
    // the raduis of Earth is approximately 6371 kilometers
    maxDistance /= 6371;

    // get coordinates [ <longitude> , <latitude> ]
    var coords = [];
    coords[0] = req.query.longitude;
    coords[1] = req.query.latitude;

    // find a location
    Gym.find({
      geo: {
        $near: coords,
        $maxDistance: maxDistance
      }
    }).limit(limit).exec((err, gyms) => {
      if (err) {
        return res.json(500, err);
      }

      res.json(200, gyms);
    });
}
