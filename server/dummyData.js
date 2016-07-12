// Enter dummy data here.

var Gym = require('./models/gym');

exports.seedData = function () {
  Gym.count().exec((err, count) => {
    if (count > 0) {
      return;
    }


    var gym1 = new Gym({ name: 'Kyle\'s gym', discipline: 'BJJ', cost: 0, when: [{day: 'Wednesday', time: 2000}], location: {city: 'New York', state: 'NY'}  });
    var gym2 = new Gym({ name: 'Connie\'s gym', discipline: 'BJJ', cost: 5, when: [{day: 'Sunday', time: 900}], location: {city: 'San Francisco', state: 'CA'}  });
    var gym3 = new Gym({ name: 'Simon\'s gym', discipline: 'BJJ', cost: 5, when: [{day: 'Sunday', time: 900}], location: {city: 'Buffalo', state: 'NY'}  });

    Gym.create([gym1, gym2, gym3], (error) => {
      if (!error) {
        console.log('ready to go....');
      }
    });
  });
}
