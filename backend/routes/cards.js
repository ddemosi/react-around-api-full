const router = require('express').Router();
const {
  getCards, createCard, deleteCard, addCardLike, removeCardLike,
} = require('../controllers/cards');

// const jsonParser = bodyParser.json();

router.get('/cards', getCards);

router.post('/cards', createCard);

router.delete('/cards/:cardId', deleteCard);

router.put('/cards/likes/:cardId', addCardLike);

router.delete('/cards/likes/:cardId', removeCardLike);

module.exports = router;
