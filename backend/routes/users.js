const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const {
  getUsers, getUserById, updateUserAvatar, updateUserInfo, getCurrentUserInfo,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/users/me', auth, getCurrentUserInfo);

router.get('/users/:id', auth, celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().required().hex(),
  }),
}), getUserById);

router.get('/users', auth, getUsers);

router.patch('/users/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserInfo);

router.patch('/users/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
}), updateUserAvatar);

module.exports = router;
