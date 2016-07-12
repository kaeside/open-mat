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

/**
 * Save a gym
 * @param req
 * @param res
 * @returns void
 */
exports.addGym = function(req, res) {
  if (!req.body.gym.name || !req.body.gym.title || !req.body.gym.content) {
    res.status(403).end();
  }

  const newGym = new Gym(req.body.gym);

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
