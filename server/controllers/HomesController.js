const Home = require("../models/Home");

module.exports = {
  create: function(params, done) {
    Home.create(params, function(err, result) {
      if (err) {
        done(err, null);
        return;
      }
      done(null, result);
    });
  },

  find: function(params, done) {
    Home.find(params, "_id title description", function(err, results) {
      if (err) {
        done(err, null);
        return;
      }
      done(null, results);
    });
  },

  findById: function(id, done) {
    Home.findById(id, function(err, results) {
      if (err) {
        done(err, null);
        return;
      }
      done(null, results);
    });
  }
};
