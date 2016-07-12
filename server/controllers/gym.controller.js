var Gym = require('../models/gym');

//Gets gyms sorted by state and city
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

/**
 * Get a single gym by name
 * @param req
 * @param res
 * @returns void
 */
exports.getGym = function(req, res) {
  Gym.findOne({ name: req.params.name }).exec((err, gym) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ gym });
  });
}

/**
 * Delete a gym by name
 * @param req
 * @param res
 * @returns void
 */
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
