const router = require('express').Router();
const bodyParser = require('body-parser');
const {
  getUsers, getUserById, updateUserAvatar, updateUserInfo, getCurrentUserInfo,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

// const jsonParser = bodyParser.json();
router.get('/users/me', auth, getCurrentUserInfo);

router.get('/users', auth, getUsers);

router.get('/users/:id', auth, getUserById);

router.patch('/users/me', auth, updateUserInfo);

router.patch('/users/me/avatar', auth, updateUserAvatar);

module.exports = router;
