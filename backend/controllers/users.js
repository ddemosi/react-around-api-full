const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { AuthorizationRequiredError } = require('../errors/authorization-required-error');
const { NotFoundError } = require('../errors/not-found-error');
const { BadRequestError } = require('../errors/bad-request-error');
const { InternalServerError } = require('../errors/internal-server-error');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user.js');

function getUsers(req, res) {
  User.find({})
    .then((users) => {
      if (users === undefined) {
        throw new NotFoundError('No users found');
      }
      res.status(200).send(users);
    })
    .catch(() => {
      res.status(500).send({ message: 'Internal error' });
    });
}

function getUserById(req, res) {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        throw new NotFoundError('Could not find user with that id');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Improper data format' });
      } else {
        res.status(500).send({ message: 'Internal Error' });
      }
    });
}

function createUser(req, res) {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      const body = {
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar,
        email: req.body.email,
        password: hash,
      };

      User.create(body).select('+password')
        .then((result) => {
          if (result) {
            res.status(200).send({ data: result });
          }
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            res.status(400).send({ message: 'User validation failed' });
          } else {
            res.status(500).send({ message: 'Internal server error' });
          }
        });
    });
}

function updateUserInfo(req, res) {
  const { name, about } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { name, about })
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      }
    })
    .catch(() => {
      res.status(500).send({ message: 'Internal Error' });
    });
}

function updateUserAvatar(req, res) {
  const { avatar } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { avatar })
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      }
    })
    .catch(() => {
      res.status(500).send({ message: 'Internal Error' });
    });
}

function getCurrentUserInfo(req, res) {
  User.findOne(req.user._id)
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Something went wrong...'));
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
}

function login(req, res) {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }
      return user;
    })
    .then((user) => {
      const compare = bcrypt.compare(password, user.password);
      if (!compare) {
        return Promise.reject(new Error('Incorrect email or password'));
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
      );
      res.status(200).send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
  getCurrentUserInfo,
};
