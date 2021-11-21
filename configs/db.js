const mongoose = require('mongoose');

const connectDB = async (MONGO_URI) => {
  try{
    await mongoose.connect(MONGO_URI);
    console.log('>>>>>>>>>>> mongo connected <<<<<<<<<<<');
  } catch (error) {

    // const err = new Error('Problem Connecting to DB');
    error.statusCode = 502;
    throw error;
  }
};

module.exports = connectDB;