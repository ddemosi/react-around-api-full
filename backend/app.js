/* eslint-disable no-useless-escape */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');

const {
  login, createUser,
} = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// route imports
const getCards = require('./routes/cards');
const getUser = require('./routes/users');
const NotFoundError = require('./errors/not-found-error');

// an array of allowed domains
const allowedCors = [
  'https://danny-around-react.students.nomoreparties.site',
  'http://www.danny-around-react.students.nomoreparties.site',
  'localhost:3000',
];

// connect to db
mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// listen to port 3000
const { PORT = 3000 } = process.env;

const app = express();

app.use(requestLogger);

app.use(express.json(), cors());

app.use((req, res, next) => {
  const { origin } = req.headers; // assign the corresponding header to the origin variable

  if (allowedCors.includes(origin)) { // check that the origin value is among the allowed domains
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
});

app.options('*', cors());

// ROUTES

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(new RegExp(/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/)),
      email: Joi.string().required().email(),
      password: Joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
    }),
  }),
  createUser,
);

// app.use(auth);

app.use('/', getCards);

app.use('/', getUser);

// catch all unmatched routes

app.use('*', () => {
  throw new NotFoundError('Resource could not be found');
});

app.use(errorLogger);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.name === 'MongoError' && err.code === 11000) {
    res.status(409).send({ message: 'Email already exists' });
  } else if (err.statusCode === undefined) {
    const { statusCode = 500, message } = err;
    res.status(statusCode).send({
      message: statusCode === 500 ? 'Internal server error' : message,
    });
  } else {
    const { statusCode, message } = err;
    res.status(statusCode).send({ message });
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
