import Deck from '../models/deck.model';
import Card from '../models/card.model';

async function deleteUserDecks(userId) {
  try {
    const decks = await Deck.find({owner: userId});
    const deckIds = decks.map(deck => deck._id);
    decks.map(deck => deck.remove());
    deckIds.map(id => deleteDeckCards(id));
  }  catch (err) {
    throw err;
  }
}

async function deleteDeckCards(deckId) {
  try {
    const cards = await Card.find({deck: deckId});
    cards.map(card => card.remove());
  } catch (err) {
    throw err;
  }
}

export {
  deleteUserDecks,
  deleteDeckCards,
};
