const jwt = require('jsonwebtoken');
const AuthorizationRequiredError = require('../errors/authorization-required-error');
require('dotenv').config();

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationRequiredError('Authorization Error');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new AuthorizationRequiredError('Authorization Error');
  }

  req.user = payload;

  next();
};
