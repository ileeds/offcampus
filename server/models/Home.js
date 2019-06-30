const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema({
  title: String,
  description: String,
  address: String,
  price: {
    type: Number
  },
  created: {
    type: Date,
    required: true,
    default: new Date()
  },
  updated: {
    type: Date
  },
  deleted: {
    type: Date
  }
});

mongoose.model("Home", HomeSchema);

module.exports = mongoose.model("Home");
