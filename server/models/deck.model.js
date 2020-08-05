import mongoose from 'mongoose';

const DeckSchema = new mongoose.Schema({
  deckname: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now
  },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  cards: [{ type: mongoose.Schema.ObjectId, ref: 'Card' }],
});

export default mongoose.model('Deck', DeckSchema);

