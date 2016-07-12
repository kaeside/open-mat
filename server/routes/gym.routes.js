var express = require('express');
var router = express.Router();
var GymController = require ('../controllers/gym.controller');

// Get all Gyms
router.route('/gyms').get(GymController.getGyms);

// Get one gym by name
router.route('/gyms/:name').get(GymController.getGym);

// Add a new Gym
router.route('/gyms').post(GymController.addGym);

// Delete a gym by name
router.route('/gyms/:name').delete(GymController.deleteGym);

module.exports = router;
