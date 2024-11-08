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
  referral: {
    type: String,
    enum: ["family or friend", "company", "internet suggested", "other"],
    required: false,
  },
  experience: {
    type: Int16Array,
    required: true,
  },
  level: {
    type: Int16Array,
    required: true,
  }
});

module.exports = mongoose.model("User", UserSchema);