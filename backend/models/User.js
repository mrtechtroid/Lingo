const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  experience:{
    type: Number,
    // required: true,
    default: 0,
    min: 0,
  },
  hearts:{
    type: Number,
    // required: true,
    default: 5,
    min: 0,
  },
  referrer:{
    type: String,
    // required: true,
    default: "No Referrer",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  language:{
    type: String,
    // required: true,
    default: "English",
  },
  lesson:{
    type: String,
    default:"672ef2b989d86b414ae197cb"
    //required: true,
  },
  level:{
    type: Number,
    // required: true,
    default: -2,
    min: -2,
  }
});

module.exports = mongoose.model("User", UserSchema);