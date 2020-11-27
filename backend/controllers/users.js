const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const isEmail = require('validator/lib/isEmail');

const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ValidationError = require('../errors/validation-error');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

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

function createUser(err, req, res, next) {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      const body = {
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar,
        email: req.body.email,
        password: hash,
      };

      if (err) {
        throw new BadRequestError('Email or password is not in proper format');
      }

      if (!isEmail(req.body.email)) {
        throw new BadRequestError('Email is not in proper format');
      }

      User.create(body)
        .then((result) => {
          if (!result) {
            throw new BadRequestError('Invalid data submitted');
          }
          const token = jwt.sign(
            { _id: result._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' },
          );

          const newObj = { token, ...result.toObject() };

          res.status(200).send({ data: newObj });
        })
        .catch(next);
    })
    .catch(next);
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
  User.findById(req.user._id)
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

  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new ValidationError('Email does not exist');
      }
      return user;
    })
    .then((user) => {
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
