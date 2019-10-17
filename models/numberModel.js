const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const numberSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  college:{
    type:String,
    required:true
  },
  events:{
    type:Array,
    required:true
  }
});

module.exports = mongoose.model("Number", numberSchema);
