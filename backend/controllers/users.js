const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { NotFoundError } = require('../errors/not-found-error');
const { BadRequestError } = require('../errors/bad-request-error');
const { ValidationError } = require('../errors/validation-error');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user.js');

function getUsers(req, res, next) {
  User.find({})
    .then((users) => {
      if (users === undefined) {
        throw new NotFoundError('No users found');
      }
      res.status(200).send(users);
    })
    .catch(next);
}

function getUserById(req, res, next) {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        throw new NotFoundError('Could not find user with that id');
      }
    })
    .catch(next);
}

function createUser(req, res, next) {
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
          if (!result) {
            throw new BadRequestError('Invalid data submitted');
          }
          res.status(200).send({ data: result });
        })
        .catch(next);
    });
}

function updateUserInfo(req, res, next) {
  const { name, about } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { name, about })
    .then((data) => {
      if (!data) {
        throw new NotFoundError('No user with that ID');
      }
      res.status(200).send(data);
    })
    .catch(next);
}

function updateUserAvatar(req, res, next) {
  const { avatar } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { avatar })
    .then((data) => {
      if (!data) {
        throw new NotFoundError('No user with that ID');
      }
      res.status(200).send(data);
    })
    .catch(next);
}

function getCurrentUserInfo(req, res, next) {
  User.findbyId(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      }
      res.status(200).send(user);
    })
    .catch(next);
}

function login(req, res, next) {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new ValidationError('Incorrect email or password');
      }
      return user;
    })
    .then((user) => {
      const compare = bcrypt.compare(password, user.password);
      if (!compare) {
        throw new ValidationError('Incorrect email or password');
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' },
      );
      res.status(200).send({ token });
    })
    .catch(next);
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
