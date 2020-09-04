import User from '../models/user.model';
import Deck from '../models/deck.model';
import Card from '../models/card.model';
import extend from 'lodash/extend';
import dbErrorHandler from './../helpers/dbErrorHandler';
import { deleteUserDecks } from '../helpers/deleteFromDB';

const create = async (req, res) => {
  
  const user = new User(req.body);
  try {
    let userToCheck = await User.findOne({ username: req.body.username });
    
    if (userToCheck) {
      return res.status(409).json({
        error: "Имя пользователя занято"
      });
    }
  
    await user.save();
    return res.status(200).json({
      message: "Успешная регистрация!"
    });
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err)
    });
  }
};

const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        error: "Пользователь не найден"
      });
    }
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Не удалось найти пользователя"
    });
  }
};

const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

const update = async (req, res) => {
  let user = req.profile;
  user = extend(user, req.body);
  try {
    // user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    return res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err)
    });
  }
};
const remove = async (req, res) => {
  try {
    let user = req.profile;
    let deletedUser = await user.remove();
    deleteUserDecks(user._id);
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err)
    });
  }
};

const cardsNumber = async (req, res) => {
  let allCards = 0;
  let todaysCards = 0;
  let repeatedCards = 0;
  let newCards = 0;
  try {
    let decks = await Deck.find({owner: req.profile._id})
                           .select('deckname cards');
    
    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    await Promise.all(decks.map(async (deck) => {
      let cards = await Card.find({deck: deck._id}).select('lastdate nextdate')

      cards.forEach((card) => {
        let nextdate = new Date(card.nextdate);
        let lastdate = new Date(card.lastdate);
        let nextday = new Date(nextdate.getFullYear(), nextdate.getMonth(), nextdate.getDate());
        let lastday = new Date(lastdate.getFullYear(), lastdate.getMonth(), lastdate.getDate());

        allCards++;
        if (nextday.getTime() <= today.getTime() || 
            lastday.getTime() == today.getTime() ) {
          todaysCards++;
        }
        if (lastday.getTime() == nextday.getTime()) {
          newCards++;
        } else if (lastday.getTime() == today.getTime()) {
          repeatedCards++;
        }
      });
    }));

    res.json({
      allCards,
      todaysCards,
      repeatedCards,
      newCards,
    });
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    }); 
  }
}

export default { 
  create, 
  userByID, 
  read, 
  update, 
  remove,
  cardsNumber,
};
