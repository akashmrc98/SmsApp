const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  sendAt: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("Message", messageSchema);
