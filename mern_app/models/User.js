const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema for user object
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  regDate: {
    type: Date,
    default: Date.now,
  },
});

//export user schema to mongoose model
module.exports = User = mongoose.model("user", UserSchema);
