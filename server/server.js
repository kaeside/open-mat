var Express = require ('express');
var mongoose = require ('mongoose');
var bodyParser = require ('body-parser');
var path = require ('path');


// Initialize the Express App
var app = new Express();


// Imports required modules
var gyms = require ('./routes/gym.routes');
var dummyData = require ('./dummyData');
var serverConfig = require ('./db/config');

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL,  (error) => {
  if (error) {
    console.error('Make sure MongoDB is running!');
    throw error;
  }
  console.log('Mongoose is connected');
  // seeds db with dummy data
  dummyData.seedData();
});

// Apply body Parser and server public assets and routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(Express.static(path.resolve(__dirname, '../build/')));
app.use('/api', gyms);




// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`Server is running on port: ${serverConfig.port}!`);
  }
});


exports.app = app;
