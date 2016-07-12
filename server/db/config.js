var config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/open-mat',
  port: process.env.PORT || 8000,
};

module.exports = config;
