import express from 'express';
import deckCtrl from '../controllers/deck.controller';
import authCtrl from '../controllers/auth.controller';
import userCtrl from '../controllers/user.controller';

const router = express.Router();

router.route('/api/decks/:userId')
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, deckCtrl.create)
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, deckCtrl.userDeckList);

router.route('/api/decks/:userId/:deckId')
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, deckCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, deckCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, deckCtrl.remove);

router.param('userId', userCtrl.userByID);
router.param('deckId', deckCtrl.deckByID);

export default router;
