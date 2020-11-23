const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const jsonParser = bodyParser.json();
const {
  login, createUser,
} = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// route imports
const getCards = require('./routes/cards');
const getUser = require('./routes/users');
const NotFoundError = require('./errors/not-found-error');

const corsOption = {
  origin: '*',
  optionsSuccessStatus: 200,
};

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

app.use(jsonParser, cors(corsOption));
app.use(requestLogger);

app.options('*', cors());

// ROUTES

app.post('/signin', jsonParser, login);

app.post('/signup', jsonParser, createUser);

app.use('/', auth, getCards);

app.use('/', auth, getUser);

// catch all unmatched routes

app.use('*', () => {
  throw new NotFoundError('Resource could not be found');
});

app.use(errorLogger);
app.use((err, req, res) => {
  if (err.statusCode === undefined) {
    const { statusCode = 500, message } = err;
    res.status(statusCode).send({
      message: statusCode === 500 ? 'Internal server error' : message,
    });
  } else {
    res.status(err.statusCode).send({ message: err.message });
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
