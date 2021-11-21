const express = require("express");
const userRoutes = require("./routes/user.routes");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
require('dotenv').config();

const connectDB = require('./configs/db');
const errorHandler = require('./utils/errorHandler');

const app=express();


connectDB(process.env.MONGO_URI);

const PORT = process.env.PORT || 3000;



app.use(bodyParser.json());

app.use('/',userRoutes);
app.use('/',cabRoutes);

app.use(errorHandler);


app.listen(PORT, console.log('=============SERVER STARTS==============='));

