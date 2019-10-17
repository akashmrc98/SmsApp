const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  sid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  college: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  c1: {
    type: String
  },
  c2: {
    type: String
  },
  c3: {
    type: String
  },
  events: {
    type: Array,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("User", userSchema);
