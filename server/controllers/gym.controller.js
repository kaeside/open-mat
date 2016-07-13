var Gym = require('../models/gym');

// gets all gyms sorted by state and city
exports.getGyms = function(req, res) {
  Gym.find().sort('location.state location.city').exec((err, gyms) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ gyms });
  });
}

// saves new gym if all reqs are met
exports.addGym = function(req, res) {
  console.log(req.body);
  var gym = req.body;

  if (!gym.name || !gym.discipline || !gym.cost || !gym.when || !gym.location) {
    res.status(403).end();
  }

  var newGym = new Gym(gym);

  newGym.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ gym: saved });
  });
}

// gets a single gym by name
exports.getGym = function(req, res) {
  Gym.findOne({ name: req.params.name }).exec((err, gym) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ gym });
  });
}

// deletes a single gym by name via param
exports.deleteGym = function(req, res) {
  Gym.findOne({ name: req.params.name }).exec((err, gym) => {
    if (err) {
      res.status(500).send(err);
    }

    gym.remove(() => {
      res.status(200).end();
    });
  });
}

// exports.findGymByGeo = function(req, res, next) {
//     var limit = req.query.limit || 10;
//
//     // get the max distance or set it to 8 kilometers
//     var maxDistance = req.query.distance || 9000;
//
//     // we need to convert the distance to radians
//     // the raduis of Earth is approximately 6371 kilometers
//     maxDistance /= 6371;
//
//     // get coordinates [ <longitude> , <latitude> ]
//     var coords = [];
//     coords[0] = req.query.longitude;
//     coords[1] = req.query.latitude;
//
//     // find a location
//     Gym.find({
//       geo: {
//         $near: coords,
//         $maxDistance: maxDistance
//       }
//     }).limit(limit).exec((err, gyms) => {
//       if (err) {
//         return res.json(500, err);
//       }
//
//       res.json(200, gyms);
//     });
// }
