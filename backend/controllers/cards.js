const Card = require('../models/card.js');

const { AuthorizationRequiredError } = require('../errors/authorization-required-error');
const { NotFoundError } = require('../errors/not-found-error');
const { BadRequestError } = require('../errors/bad-request-error');
const { InternalServerError } = require('../errors/internal-server-error');

const getCards = (req, res) => Card.find({})
  .then((cards) => {
    if (cards) {
      res.status(200).send(cards);
    } else {
      throw new NotFoundError('No cards found');
    }
  })
  .catch(() => res.status(500).send({ message: 'Internal error' }));

function createCard(req, res) {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((result) => {
      if (result) {
        res.status(200).send({ data: result });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'User validation failed' });
      } else {
        res.status(500).send({ message: 'Internal error' });
      }
    });
}

function deleteCard(req, res) {
  const id = req.params.cardId;
  Card.findByIdAndRemove(id)
    .then(() => {
      if (req.params.id === undefined) {
        throw new NotFoundError('Could not find a card with that id');
      }
      res.status(200).send({ message: 'Card deleted' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Improper data format' });
      } else {
        res.status(500).send({ message: 'Internal error' });
      }
    });
}

function addCardLike(req, res) {
  const id = req.params.cardId;
  const user = req.user._id;
  Card.findByIdAndUpdate(id, { $addToSet: { likes: user } })
    .then(() => {
      res.status(200).send({ message: 'Like added' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Improper data format' });
      } else {
        res.status(500).send({ message: 'Internal error' });
      }
    });
}

function removeCardLike(req, res) {
  const id = req.params.cardId;
  const user = req.user._id;
  Card.findByIdAndUpdate(id, { $pull: { likes: user } })
    .then(() => {
      res.status(200).send({ message: 'Like removed' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Improper data format' });
      } else {
        res.status(500).send({ message: 'Internal error' });
      }
    });
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addCardLike,
  removeCardLike,
};
