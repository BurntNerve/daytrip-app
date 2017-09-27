const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const yelp = require('yelp-fusion');
const jsonParser = require('body-parser').json();

const { DATABASE_URL, PORT } = require('../config');
const Agenda = require('../models.js');

const clientId = 'zWM7p6Q2220lLqmTUE1jyg';
const clientSecret =
  'pMjDZTGKtSBgfxmEzZgTTX3pVUSjTcrahyZXufTrURzgEfUAJM8kI47cW9kHSGqo';
const token =
  'vhc3LfRXOJRwg94PSimh1QwIoMnQBI7Ylqol4bdKUXVL-FV-mYwlHF4SbnUGO29CEIlp4yfe6skkxK-ojieYzsaEFBJ9_mUTXgQaR-G6LFTmqbtlTpgsflqGW99KWXYx';

const client = yelp.client(token);

let tempAgenda;

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
  console.log(tempAgenda);
  res.status(204).send();
});

router.get('/agenda', function(req, res, next) {
  res.status(200).send(tempAgenda);
});

module.exports = router;
