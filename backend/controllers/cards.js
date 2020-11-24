const Card = require('../models/card.js');

const AuthorizationRequiredError = require('../errors/authorization-required-error');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error.js');

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
  Card.findByIdAndRemove(id)
    .then((card) => {
      if (card.owner !== req.user._id) {
        throw new AuthorizationRequiredError('Authorization required for this action');
      } else if (req.params.id === undefined) {
        throw new NotFoundError('Could not find a card with that id');
      } else {
        res.status(200).send({ message: 'Card deleted' });
      }
    })
    .catch(next);
}

function addCardLike(req, res, next) {
  const id = req.params.cardId;
  const user = req.user._id;
  Card.findByIdAndUpdate(id, { $addToSet: { likes: user } })
    .then(() => {
      res.status(200).send({ message: 'Like added' });
    })
    .catch(next);
}

function removeCardLike(req, res, next) {
  const id = req.params.cardId;
  const user = req.user._id;
  Card.findByIdAndUpdate(id, { $pull: { likes: user } })
    .then(() => {
      res.status(200).send({ message: 'Like removed' });
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
