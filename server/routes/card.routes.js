import express from 'express';
import authCtrl from '../controllers/auth.controller';
import userCtrl from '../controllers/user.controller';
import deckCtrl from '../controllers/deck.controller';
import cardCtrl from '../controllers/card.controller';

const router = express.Router();

router.route('/api/cards/:userId/:deckId')
  .post(cardCtrl.create)
  .get(cardCtrl.getCardList);

router.route('/api/cards/:userId/:deckId/:cardId')
  .get(cardCtrl.read)
  .put(cardCtrl.update)
  .delete(cardCtrl.remove);

router.param('userId', userCtrl.userByID);
router.param('deckId', deckCtrl.deckByID);
router.param('cardId', cardCtrl.cardByID);

export default router;

