var express = require('express');
var router = express.Router();
var NearbyController = require ('../controllers/nearby.controller');



// gets all gyms near geolocation
router.route('/nearby').get(NearbyController.findNearbyGyms);

module.exports = router;
