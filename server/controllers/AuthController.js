const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = {
  emailLogin: (email, password, done) => {
    User.findOne(
      {
        email: email
      },
      function(err, user) {
        if (err) {
          done(err, null);
          return;
        }

        if (!user) {
          //User not found
          done(err, null);
        } else {
          user.comparePassword(password, function(err, isMatch) {
            if (err) {
              done(err, null);
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
              done(null, authToken);
            } else {
              done(err, null);
            }
          });
        }
      }
    );
  },

  emailRegister: (email, password, firstName, lastName, done) => {
    const newUser = new User({ email, password, firstName, lastName });

    newUser.save().then(err, user => {
      if (err) {
        done(err, null);
        return;
      }

      const authToken = jwt.sign(
        {
          email: user.email,
          _id: user._id
        },
        process.env.JWTSECRET
      );
      done(null, authToken);
    });
  }
};
