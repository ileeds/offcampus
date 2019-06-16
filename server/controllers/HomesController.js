const Home = require('../models/Home')

module.exports = {
  create: function(params, callback) {
    Home.create(params, function(err, result) {
      if (err) {
        callback(err, null);
        return
      }
      callback(null, result);
    });
  },

  find: function(params, callback) {
    Home.find(params, '_id title description', function(err, results) {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    })
  },

  findById: function(id, callback) {
    Home.findById(id, function(err, results) {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    })
  }
}
