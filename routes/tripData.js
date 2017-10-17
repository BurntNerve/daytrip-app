const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const yelp = require('yelp-fusion');
const jsonParser = require('body-parser').json();
const passport = require('passport');
const uuid = require('uuid');

const { User } = require('../Users/models.js');

const { DATABASE_URL, PORT } = require('../config');

const clientId = 'zWM7p6Q2220lLqmTUE1jyg';
const clientSecret =
  'pMjDZTGKtSBgfxmEzZgTTX3pVUSjTcrahyZXufTrURzgEfUAJM8kI47cW9kHSGqo';
const token =
  'vhc3LfRXOJRwg94PSimh1QwIoMnQBI7Ylqol4bdKUXVL-FV-mYwlHF4SbnUGO29CEIlp4yfe6skkxK-ojieYzsaEFBJ9_mUTXgQaR-G6LFTmqbtlTpgsflqGW99KWXYx';

const client = yelp.client(token);

let tempAgenda;
let tempOptions;
let currentUser;
let savedAgenda;

router.post('/', function(req, res, next) {
  console.log(req.body);
  client
    .search({
      term: req.body.term,
      location: req.body.location,
      limit: req.body.limit
    })
    .then(response => {
      const firstResult = response.jsonBody.businesses;
      res.json(firstResult);
    })
    .catch(e => {
      console.log(e);
    });
});

router.post('/agenda', function(req, res, next) {
  console.log('recieved!');
  tempAgenda = req.body;
  console.log(req.body.info.user);
  if (req.body.info.user !== null && req.body.info.user !== '') {
    console.log('tripped');
    const query = { username: req.body.info.user };
    const options = { new: true };
    tempAgenda.info.id = uuid();
    User.findOneAndUpdate(
      query,
      { $push: { agendas: tempAgenda } },
      options,
      function(err, docs) {}
    );
    User.find({ username: req.body.info.user }, function(err, docs) {
      console.log(docs);
      console.log(docs[0]['agendas'].length);
    });
  }
  console.log(tempAgenda);
  res.status(204).send();
});

router.get('/agenda', function(req, res, next) {
  if (tempAgenda) {
    res.status(200).send(tempAgenda);
  }
});

router.post('/options', function(req, res, next) {
  res.status(201).send();
  tempOptions = req.body;
  console.log(req.body);
});

router.get('/options', function(req, res, next) {
  res.status(200).json(tempOptions);
});

router.post('/current/agendas', function(req, res, next) {
  let yourAgendas = {};
  console.log(req.body.username);
  User.find({ username: req.body.username }, function(err, docs) {
    if (docs[0]['agendas']) {
      console.log(docs);
      console.log(docs[0]['agendas'].length);
      yourAgendas.agendas = docs[0]['agendas'];
      yourAgendas.amount = docs[0]['agendas'].length;
      res.status(200).send(yourAgendas);
    } else {
      res.status(200).send('You have no agendas.');
    }
  });
});

router.post('/saved', jsonParser, function(req, res, next) {
  savedAgenda = req.body;
  res.status(204).send();
});

router.get('/saved', function(req, res, next) {
  res.status(201).send(savedAgenda);
});

router.post('/saved/changes', function(req, res, next) {
  console.log(req.body);
  const query = { username: req.body.user };
  User.findOne(query, function(err, docs) {
    let updatedAgenda;
    console.log(docs.agendas);
    for (let i = 0; i < docs.agendas.length; i++) {
      if (docs.agendas[i].info.id === req.body.id) {
        docs.agendas[i].info.name = req.body.title;
        updatedAgenda = docs.agendas;
      }
    }
    User.findOneAndUpdate(query, { agendas: updatedAgenda }, function(
      err,
      docs
    ) {
      console.log(docs);
    });
  });
  res.status(204).send();
});

router.post('/saved/delete', function(req, res, next) {
  console.log(req.body);
  res.status(204).send();
  const query = { username: req.body.user };
  User.findOne(query, function(err, docs) {
    let updatedAgenda;
    console.log('original');
    console.log(docs.agendas.length);
    for (let i = 0; i < docs.agendas.length; i++) {
      if (docs.agendas[i].info.id === req.body.id) {
        docs.agendas.splice(i, 1);
        updatedAgenda = docs.agendas;
        console.log('edited');
        console.log(updatedAgenda.length);
      }
    }
    User.findOneAndUpdate(query, { agendas: updatedAgenda }, function(
      err,
      docs
    ) {
      console.log('updated');
      console.log(docs.agendas.length);
    });
  });
});
module.exports = router;
