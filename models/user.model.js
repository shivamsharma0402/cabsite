const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  userid:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
  },
  name: {
    firstname: {
      type: String,
    },
    lastname: {
      type: String
    }, 
  },
  age: {
    type: Number
  },
  gender: {
    type: String
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

module.exports = mongoose.model('User',userSchema);