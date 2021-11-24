const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cabSchema = new Schema({
  model: {
    type: String,
    required: true,
  },
  colour: {
    type: String,
    required: true,
  },
  vehicleNumber: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model('Cab',cabSchema);