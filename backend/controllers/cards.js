const Card = require('../models/card.js');

const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error.js');
const AccessDeniedError = require('../errors/access-denied-error.js');

const getCards = (req, res, next) => Card.find({})
  .then((cards) => {
    if (cards) {
      res.status(200).send(cards);
    } else {
      throw new NotFoundError('No cards found');
    }
  })
  .catch(next);

function createCard(req, res, next) {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((result) => {
      if (!result) {
        throw new BadRequestError('Invalid data submitted');
      }
      res.status(200).send(result);
    })
    .catch(next);
}

function deleteCard(req, res, next) {
  const id = req.params.cardId;

  Card.findById(id)
    .then((card) => {
      if (String(card.owner) === req.user._id) {
        Card.findByIdAndRemove(id, () => {
          res.status(200).send({ message: 'Card deleted' });
        });
      } else if (req.params.id === undefined) {
        throw new NotFoundError('Could not find a card with that id');
      } else {
        throw new AccessDeniedError('Authorization required for this action');
      }
    })
    .catch(next);
}

function addCardLike(req, res, next) {
  const id = req.params.cardId;
  const user = req.user._id;
  Card.findByIdAndUpdate(id, { $addToSet: { likes: user } }, { new: true })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch(next);
}

function removeCardLike(req, res, next) {
  const id = req.params.cardId;
  const user = req.user._id;
  Card.findByIdAndUpdate(id, { $pull: { likes: user } }, { new: true })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch(next);
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addCardLike,
  removeCardLike,
};
