const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const {
  login, createUser,
} = require('./controllers/users');
const auth = require('./middlewares/auth');

// connect to db
mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// route imports
const getCards = require('./routes/cards');
const getUser = require('./routes/users');

// listen to port 3000
const { PORT = 3000 } = process.env;

const app = express();

app.use('/', auth, getCards);

app.use('/', auth, getUser);

app.post('/signin', jsonParser, login);

app.post('/signup', jsonParser, createUser);

app.use('*', (req, res) => {
  res.status(404).send({ message: '404 resource could not be found' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
