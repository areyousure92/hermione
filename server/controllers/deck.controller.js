import extend from 'lodash/extend';
import dbErrorHandler from '../helpers/dbErrorHandler';
import Deck from '../models/deck.model';
import { deleteDeckCards } from '../helpers/deleteFromDB';

// Deck 
const create = async (req, res) => {
  const deck = new Deck(req.body);
  deck.owner = req.profile;
  try {
    await deck.save();
    return res.status(200).json({
      message: 'Колода успешно сохранена.',
    });
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

const deckByID = async (req, res, next, id) => {
  try {
    const deck = await Deck.findById(id);
    if (!deck) {
      return res.status(400).json({
        error: 'Колода не найдена',
      });
    }
    req.deck = deck;
    next();
  } catch (err) {
    return res.status(400).json({
      error: 'Не удалось найти колоду',
    });
  }
};

const read = (req, res) => {
  return res.json(req.deck);
};

const update = async (req, res) => {
  let deck = req.deck;
  deck = extend(deck, req.body);
  try {
    await deck.save();
    return res.json(deck);
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }  
};

const remove = async (req, res) => {
  const deck = req.deck;
  try {
    let deletedDeck = await deck.remove();
    deleteDeckCards(deck._id);
    res.json(deletedDeck);
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

const userDeckList = async (req, res) => {
  try {
    let decks = await Deck.find({owner: req.profile._id}).select('deckname cards');
    res.json(decks);
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};


export default {
  create,
  deckByID,
  read,
  update,
  remove,
  userDeckList,
};
