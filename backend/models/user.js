const mongoose = require('mongoose');
const validation = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Explorer',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    validate: {
      validator(v) {
        return /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi.test(v);
      },
      message: 'Invalid URL',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(v) {
          validation.isEmail(v);
        },
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 30,
      select: false,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
