import express from 'express';
import authCtrl from '../controllers/auth.controller';
import userCtrl from '../controllers/user.controller';
import deckCtrl from '../controllers/deck.controller';
import cardCtrl from '../controllers/card.controller';

const router = express.Router();

router.route('/api/cards/:userId/:deckId')
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, cardCtrl.create)
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, cardCtrl.getCardList);

router.route('/api/cards/:userId/:deckId/:cardId')
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, cardCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, cardCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, cardCtrl.remove);

router.param('userId', userCtrl.userByID);
router.param('deckId', deckCtrl.deckByID);
router.param('cardId', cardCtrl.cardByID);

export default router;

