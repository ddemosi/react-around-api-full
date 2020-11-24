const router = require('express').Router();
const bodyParser = require('body-parser');
const {
  getCards, createCard, deleteCard, addCardLike, removeCardLike,
} = require('../controllers/cards');

// const jsonParser = bodyParser.json();

router.get('/cards', getCards);

router.post('/cards', createCard);

router.delete('/cards/:cardId', deleteCard);

router.put('/cards/:cardId/likes', addCardLike);

router.delete('/cards/:cardId/likes', removeCardLike);

module.exports = router;
