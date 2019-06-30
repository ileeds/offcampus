const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = {
  login: function(email, password, callback) {
    User.findOne(
      {
        email: email
      },
      function(err, user) {
        if (err) {
          callback(err, null);
          return;
        }

        if (!user) {
          //User not found
          callback(err, null);
        } else {
          user.comparePassword(password, function(err, isMatch) {
            if (err) {
              callback(err, null);
              return;
            }

            if (isMatch) {
              const authToken = jwt.sign(
                {
                  email: user.email,
                  _id: user._id
                },
                process.env.JWTSECRET
              );
              callback(null, authToken);
            } else {
              callback(err, null);
            }
          });
        }
      }
    );
  },

  register: function(email, password, firstName, lastName, callback) {
    const newUser = new User({ email, password, firstName, lastName });

    newUser.save(function(err, user) {
      if (err) {
        if (err.name == "ValidationError" || err.name == "MongoError") {
          err.status = 400;
        }
        callback(err, null);
        return;
      }

      const authToken = jwt.sign(
        {
          email: user.email,
          _id: user._id
        },
        process.env.JWTSECRET
      );
      callback(null, authToken);
    });
  }
};
