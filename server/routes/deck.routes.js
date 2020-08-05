import express from 'express';
import deckCtrl from '../controllers/deck.controller';
import authCtrl from '../controllers/auth.controller';
import userCtrl from '../controllers/user.controller';

const router = express.Router();

router.route('/api/decks/:userId')
  .post(deckCtrl.create)
  .get(deckCtrl.userDeckList);

router.route('/api/decks/:userId/:deckId')
  .get(deckCtrl.read)
  .put(deckCtrl.update)
  .delete(deckCtrl.remove);

router.param('userId', userCtrl.userByID);
router.param('deckId', deckCtrl.deckByID);

export default router;
