require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');

const dataRoute = require('./routes/tripData.js');
const { router: usersRouter } = require('./Users');
const { router: authRouter, basicStrategy, jwtStrategy } = require('./Auth');

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require('./config');

app.use(morgan('common'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
passport.use(basicStrategy);
passport.use(jwtStrategy);

app.use('/data', dataRoute);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
