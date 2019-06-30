const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var validator = require("validator");

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    index: {
      unique: true
    },
    required: true,
    validate: [validator.isEmail, "invalid email"]
  },
  password: { type: String, required: true },
  created: {
    type: Date,
    required: true,
    default: new Date()
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  updated: {
    type: Date
  },
  deleted: {
    type: Date
  }
});

UserSchema.methods.comparePassword = function comparePassword(
  password,
  callback
) {
  bcrypt.compare(password, this.password, callback);
};

// On save, hash the password

UserSchema.pre("save", function saveHook(next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  return bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }

    return bcrypt.hash(user.password, salt, function(hashError, hash) {
      if (hashError) {
        return next(hashError);
      }
      user.password = hash;
      return next();
    });
  });
});

module.exports = mongoose.model("User", UserSchema);
