'use strict';

const testDB = false;
let dbURI;

// Simple conditional to determine whether to use test or prod db
if (testDB == true) {
  dbURI = 'test';
} else {
  dbURI = 'Beer';
}

// Importing packages as a variable
const express = require('express');
const cors = require('cors');
const routes = require('./routes/route');
const mongoose = require('mongoose');

// creating a variable called app that is equal to express.
// initalising our app
const app = express();

// Connecting our app to mongodb
mongoose.connect(`mongodb+srv://root:root@cluster0.24r00.mongodb.net/${dbURI}`, { useNewUrlParser: true }, (error) => {
  if (error) {
    console.log(`Error, cannot connect to database: ${error}`);
  } else {
    console.log('No error');
  }
});

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/beer', routes);

// Custom middleware
// Any middleware with 'err' will be called when Express catches an error
const errorLogger = (err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send(err.message);
};

app.use(errorLogger);

// Telling our app to run on a port
const server = app.listen(6969, () => {
  console.log(`Server running on port ${server.address().port} XD`);
});

// Exporting the server so our test can access it
module.exports = server;
