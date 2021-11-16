const express = require("express");
const userRoutes = require("./routes/user.routes");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
require('dotenv').config();

const errorHandler = require('./utils/errorHandler');

const app=express();

console.log('====================SERVER STARTS=======================')

app.use(bodyParser.json());
app.use('/',userRoutes);

app.use(errorHandler);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.hfqxk.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`)
  .then(result=>{
    app.listen( process.env.PORT || 3000);
  })
  .catch(err=>{
    console.log(err);
  })

