const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema for item object
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateRecorded: {
    type: Date,
    default: Date.now,
  },
});

//export itemschema to mongoose model
module.exports = Item = mongoose.model("item", ItemSchema);
