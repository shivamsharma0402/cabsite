const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userDetailsSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String
    }, 
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  dob:{
    type: Date,
    required: true
  },
  usualtype: {
    type: [String],
      required: true,
      enum: [
        'on foot',
        'on car',
      ]
  }

});

module.exports = mongoose.model('UserDetails',userDetailsSchema);