import extend from 'lodash/extend';
import dbErrorHandler from '../helpers/dbErrorHandler';
import Card from '../models/card.model';

const create = async (req, res) => {
  const card = new Card(req.body);
  card.deck = req.deck;
  try {
    await card.save();
    return res.status(200).json({
      message: 'Карта успешно сохранена.',
    });
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

const cardByID = async (req, res, next, id) => {
  try {
    const card = await Card.findById(id);
    if (!card) {
      return res.status(400).json({
        error: 'Карта не найдена.',
      });
    }
    req.card = card;
    next();
  } catch (err) {
    return res.status(400).json({
      error: 'Не удалось найти карту.',
    });
  }
};

const getCardList = async (req, res) => {
  try {
    let cards = await Card.find({deck: req.deck._id}).select('q a interval lastdate nextdate');
    return res.json(cards);
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

const read = (req, res) => {
  return res.json(req.card);
};

const update = async (req, res) => {
  let card = req.card;
  card = extend(card, req.body);
  try {
    await card.save();
    return res.json(card);    
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  const card = req.card;
  try {
    let deletedCard = await card.remove();
    return res.json(deletedCard);
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

export default {
  create,
  cardByID,
  getCardList,
  read,
  update,
  remove,
};
