const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const {
  getCards, createCard, deleteCard, addCardLike, removeCardLike,
} = require('../controllers/cards');
const auth = require('../middlewares/auth');

router.get('/cards', auth, getCards);

router.post('/cards', auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(new RegExp(/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/)),
    }),
  }), createCard);

router.delete('/cards/:cardId', auth, celebrate({
  [Segments.PARAMS]: Joi.object({
    cardId: Joi.string().required().hex(),
  }),
}), deleteCard);

router.put('/cards/likes/:cardId', auth, celebrate({
  [Segments.PARAMS]: Joi.object({
    cardId: Joi.string().required().hex(),
  }),
}), addCardLike);

router.delete('/cards/likes/:cardId', auth, celebrate({
  [Segments.PARAMS]: Joi.object({
    cardId: Joi.string().required().hex(),
  }),
}), removeCardLike);

module.exports = router;
