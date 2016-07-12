var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
name: gym name,
discipline: type of martial art,
cost: amount due to participate,
when: day of the week and time in 24 hour clock time e.g 6am = 0600,
location: city and state for now, possibly geolocation in the future
 */

var gymSchema = new Schema({
  name: { type: 'String', required: true },
  discipline: { type: 'String', required: true },
  cost: { type: 'Number', required: true },
  when: [{
              day: { type: 'String', required: true },
              time: { type: 'Number', required: true }
            }],
  location: {
              city: { type: 'String', required: true },
              state: { type: 'String', required: true }
            }
});

var Gym = mongoose.model('Gym', gymSchema);

module.exports = Gym;
