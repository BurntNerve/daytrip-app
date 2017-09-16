const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const dataRoute = require('./routes/tripData.js');

app.use(morgan('common'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/data', dataRoute);

app.listen(8080, () => {
  console.log('Your app is listening on port 8080');
});
