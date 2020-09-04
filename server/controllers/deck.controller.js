import extend from 'lodash/extend';
import dbErrorHandler from '../helpers/dbErrorHandler';
import Deck from '../models/deck.model';
import Card from '../models/card.model';
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

    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    decks = await Promise.all(decks.map(async (deck) => {
      let allCards = 0;
      let todaysCards = 0;
      let repeatedCards = 0;
      let newCards = 0;
      
      let cards = await Card.find({deck: deck._id}).select('lastdate nextdate')

      cards.forEach((card) => {
        let nextdate = new Date(card.nextdate);
        let lastdate = new Date(card.lastdate);
        let nextday = new Date(nextdate.getFullYear(), nextdate.getMonth(), nextdate.getDate());
        let lastday = new Date(lastdate.getFullYear(), lastdate.getMonth(), lastdate.getDate());

        allCards++;
        if (nextday.getTime() <= today.getTime()) {
          todaysCards++;
        }
        if (lastday.getTime() == nextday.getTime()) {
          newCards++;
        } else if (lastday.getTime() == today.getTime()) {
          repeatedCards++;
        }
      });

      deck.allCards = allCards;
      deck.todaysCards = todaysCards;
      deck.repeatedCards = repeatedCards;
      deck.newCards = newCards;

      await deck.save();
      return deck;
    }));

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
