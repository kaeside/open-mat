var Gym = require('./models/gym');

// seeds db with dummy data at server start. Make sure MongoDB is running.

exports.seedData = function () {
  Gym.count().exec((err, count) => {
    if (count > 0) {
      return;
    }


    var gym1 = new Gym({ name: 'Kyle\'s gym', discipline: 'BJJ', cost: 0, when: [{day: 'Wednesday', time: 2000}], location: {city: 'Concord', state: 'CA'}, geo: [-122.056652, 37.969957]  });
    var gym2 = new Gym({ name: 'Connie\'s gym', discipline: 'BJJ', cost: 5, when: [{day: 'Sunday', time: 900}], location: {city: 'Pleasant Hill', state: 'CA'}, geo: [ -122.057432, 37.958547]  });
    var gym3 = new Gym({ name: 'Simon\'s gym', discipline: 'BJJ', cost: 5, when: [{day: 'Saturday', time: 730}], location: {city: 'Berkeley', state: 'CA'}, geo: [-122.294887, 37.876822]  });
    var gym4 = new Gym({ name: 'Five Star', discipline: 'BJJ', cost: 10, when: [{day: 'Saturday', time: 730}], location: {city: 'Los Angeles', state: 'CA'}, geo: [-118.319252, 34.062055]  });

    Gym.create([gym1, gym2, gym3, gym4], (error) => {
      if (!error) {
        console.log('Gyms have been seeded...');
      }
    });
  });
}
